export const dynamic = 'force-dynamic';

async function getMerchants() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/merchants`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    return [];
  }
}

export default async function MerchantsAdminPage() {
  const merchants = await getMerchants();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Merchants & Scans</h1>
          <p className="text-gray-500 mt-2">Manage tracking adapters and manual triggers.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          + Add Merchant
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:border-blue-300 transition text-left">
          <h3 className="font-bold text-gray-900 mb-1">▶️ Start Full Scan</h3>
          <p className="text-sm text-gray-500">Trigger product discovery across all enabled merchants.</p>
        </button>
        <button className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:border-blue-300 transition text-left">
          <h3 className="font-bold text-gray-900 mb-1">▶️ Refresh Collection</h3>
          <p className="text-sm text-gray-500">Update prices for your owned items immediately.</p>
        </button>
        <button className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:border-blue-300 transition text-left">
          <h3 className="font-bold text-gray-900 mb-1">▶️ Refresh Wishlist</h3>
          <p className="text-sm text-gray-500">Update target prices for your wishlist items.</p>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600">Name</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Domain</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Last Run</th>
              <th className="px-6 py-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {merchants.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No merchants configured.</td></tr>
            ) : (
              merchants.map((m: any) => (
                <tr key={m.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{m.name}</td>
                  <td className="px-6 py-4 text-gray-500">{m.domain}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${m.isEnabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {m.isEnabled ? 'ACTIVE' : 'DISABLED'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{m.lastSuccessfulRunAt || 'Never'}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:underline">Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
