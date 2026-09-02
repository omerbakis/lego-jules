export const dynamic = 'force-dynamic';

export default async function WishlistPage() {
  let items = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/wishlist-items`, { cache: 'no-store' });
    if (res.ok) items = await res.json();
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Wishlist</h1>
      <p className="mb-8">Manage targeted prices for sets you want to buy.</p>

      {items.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item: any) => (
            <div key={item.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold">{item.legoSet?.name || 'Unknown Set'}</h2>
              <p>Target Price: {item.targetPrice} {item.currency}</p>
              <p>Priority: {item.priority}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
