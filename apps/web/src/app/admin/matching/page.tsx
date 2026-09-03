export const dynamic = 'force-dynamic';

async function getUnknownProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/merchant-products?classification=UNKNOWN`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    return [];
  }
}

export default async function MatchingAdminPage() {
  const products = await getUnknownProducts();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Product Matching</h1>
        <p className="text-gray-500 mt-2">Review unclassified and low-confidence matches.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-bold text-gray-800">Pending Classification ({products.length})</h2>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600">Product Title</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Merchant</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Suspected Class</th>
              <th className="px-6 py-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">All products are classified.</td></tr>
            ) : (
              products.map((p: any) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium max-w-md truncate" title={p.title}>{p.title}</td>
                  <td className="px-6 py-4">{p.merchant?.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-bold">UNKNOWN</span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-green-600 hover:underline font-medium">Classify as Set</button>
                    <button className="text-gray-600 hover:underline">Mark Non-Lego</button>
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
