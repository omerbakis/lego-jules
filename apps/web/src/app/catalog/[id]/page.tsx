export const dynamic = 'force-dynamic';

export default async function CatalogDetailPage({ params }: { params: { id: string } }) {
  let setDetail: any = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/lego-sets/${params.id}`, { cache: 'no-store' });
    if (res.ok) setDetail = await res.json();
  } catch (err) {
    console.error(err);
  }

  if (!setDetail) return <div className="p-8">Set not found</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{setDetail.name} ({setDetail.setNumber})</h1>
      <div className="mb-8">
        <p>Theme: {setDetail.theme}</p>
        <p>Pieces: {setDetail.pieceCount}</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Price Comparison & Offers</h2>
      <p className="mb-4 text-gray-600">This section displays current merchant offers, stock status, and historical pricing charts.</p>

      <div className="border p-4 bg-gray-50 rounded shadow mb-4">
        <h3 className="font-bold">Mock Merchant Offer</h3>
        <p>Seller: Hepsiburada</p>
        <p>Price: 4500 TRY</p>
        <p>Stock: In Stock</p>
      </div>
    </div>
  );
}
