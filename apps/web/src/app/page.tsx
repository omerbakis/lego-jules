export const dynamic = "force-dynamic";

import Link from 'next/link';

async function fetchDashboardData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/app-profiles/dashboard`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function DashboardPage() {
  const data = await fetchDashboardData();

  const displayName = data?.profile?.displayName || 'Collector';
  const stats = data?.stats || { totalPhysical: 0, distinctSets: 0, totalCost: 0, currentZeroValue: 0 };
  const recentCollection = data?.recentCollection || [];
  const recentPrices = data?.recentPrices || [];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {displayName}!</h1>
        <p className="text-gray-500 mt-2">Here is a quick overview of your LEGO collection.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm font-medium text-gray-500 mb-1">Total Physical Sets</div>
          <div className="text-3xl font-bold text-gray-900">{stats.totalPhysical}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm font-medium text-gray-500 mb-1">Distinct LEGO Sets</div>
          <div className="text-3xl font-bold text-gray-900">{stats.distinctSets}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm font-medium text-gray-500 mb-1">Total Purchase Cost</div>
          <div className="text-3xl font-bold text-red-600">{stats.totalCost.toLocaleString()} TRY</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm font-medium text-gray-500 mb-1">Current Retail Value</div>
          <div className="text-3xl font-bold text-green-600">{stats.currentZeroValue.toLocaleString()} TRY</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Link href="/collection" className="group bg-blue-50 hover:bg-blue-100 transition-colors p-6 rounded-xl border border-blue-200">
          <h2 className="text-xl font-bold text-blue-900 mb-2">My Collection 📦</h2>
          <p className="text-blue-700">Manage your owned sets</p>
        </Link>
        <Link href="/wishlist" className="group bg-purple-50 hover:bg-purple-100 transition-colors p-6 rounded-xl border border-purple-200">
          <h2 className="text-xl font-bold text-purple-900 mb-2">Wishlist 🎯</h2>
          <p className="text-purple-700">Track target prices</p>
        </Link>
        <Link href="/catalog" className="group bg-orange-50 hover:bg-orange-100 transition-colors p-6 rounded-xl border border-orange-200">
          <h2 className="text-xl font-bold text-orange-900 mb-2">Price Compare 💸</h2>
          <p className="text-orange-700">Find the best deals</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-bold text-gray-800">Recent Collection Additions</h3>
          </div>
          <div className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="bg-white border-b">
                <tr>
                  <th className="px-6 py-3 text-gray-500 font-semibold">Set</th>
                  <th className="px-6 py-3 text-gray-500 font-semibold">Condition</th>
                  <th className="px-6 py-3 text-gray-500 font-semibold">Price</th>
                </tr>
              </thead>
              <tbody>
                {recentCollection.length === 0 && (
                  <tr><td colSpan={3} className="px-6 py-4 text-gray-500 text-center">No recent items</td></tr>
                )}
                {recentCollection.map((item: any) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{item.legoSet?.name}</td>
                    <td className="px-6 py-4">{item.setCondition || '-'}</td>
                    <td className="px-6 py-4">{item.purchasePrice ? `${item.purchasePrice} TRY` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-bold text-gray-800">Recent Price Changes</h3>
          </div>
          <div className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="bg-white border-b">
                <tr>
                  <th className="px-6 py-3 text-gray-500 font-semibold">Set</th>
                  <th className="px-6 py-3 text-gray-500 font-semibold">New Price</th>
                  <th className="px-6 py-3 text-gray-500 font-semibold">Merchant</th>
                </tr>
              </thead>
              <tbody>
                {recentPrices.length === 0 && (
                  <tr><td colSpan={3} className="px-6 py-4 text-gray-500 text-center">No recent price observations</td></tr>
                )}
                {recentPrices.map((obs: any) => (
                  <tr key={obs.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{obs.offer?.product?.legoSet?.name || 'Unknown'}</td>
                    <td className="px-6 py-4 text-green-600 font-bold">{obs.salePrice} TRY</td>
                    <td className="px-6 py-4">{obs.offer?.merchant?.name || 'Unknown'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
