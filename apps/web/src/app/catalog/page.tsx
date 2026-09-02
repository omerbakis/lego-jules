export const dynamic = 'force-dynamic';

interface LegoSet {
  id: string;
  setNumber: string;
  name: string;
  theme: string;
  pieceCount: number | null;
}

async function getLegoSets(): Promise<LegoSet[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/lego-sets`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function CatalogPage() {
  const sets = await getLegoSets();
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">LEGO Star Wars Catalog</h1>
      <p className="mb-8">This page displays the full catalog of LEGO Star Wars sets.</p>

      {sets.length === 0 ? (
        <p>No sets found. Run the catalog import job.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sets.map((set) => (
            <div key={set.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold">{set.name}</h2>
              <p className="text-gray-600">Set: {set.setNumber}</p>
              <p className="text-gray-600">Theme: {set.theme}</p>
              <p className="text-gray-600">Pieces: {set.pieceCount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
