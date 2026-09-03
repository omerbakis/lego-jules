import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white flex flex-col h-full shadow-lg">
          <div className="p-6 border-b border-gray-800">
            <h1 className="text-2xl font-bold tracking-tight text-yellow-400">LEGO Jules</h1>
            <p className="text-xs text-gray-400 mt-1">Collection Tracker</p>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <Link href="/" className="block px-4 py-2 rounded transition-colors hover:bg-gray-800">🏠 Dashboard</Link>
            <Link href="/catalog" className="block px-4 py-2 rounded transition-colors hover:bg-gray-800">📚 Catalog</Link>
            <Link href="/collection" className="block px-4 py-2 rounded transition-colors hover:bg-gray-800">📦 My Collection</Link>
            <Link href="/wishlist" className="block px-4 py-2 rounded transition-colors hover:bg-gray-800">🎯 Wishlist</Link>

            <div className="pt-4 mt-4 border-t border-gray-800">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Admin</p>
              <Link href="/admin/merchants" className="block px-4 py-2 rounded transition-colors hover:bg-gray-800">🏪 Merchants</Link>
              <Link href="/admin/matching" className="block px-4 py-2 rounded transition-colors hover:bg-gray-800">🔗 Matching</Link>
            </div>
          </nav>

          <div className="p-4 border-t border-gray-800 space-y-2">
            <Link href="/profile" className="block px-4 py-2 rounded transition-colors hover:bg-gray-800">⚙️ Settings</Link>
            <button className="w-full text-left px-4 py-2 rounded transition-colors hover:bg-red-900 text-red-400">🚪 Logout</button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="bg-white shadow-sm h-16 flex items-center px-8 flex-shrink-0 z-10">
            <div className="ml-auto flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">AppProfile (id: 1)</span>
            </div>
          </header>
          <div className="flex-1 overflow-auto bg-gray-50 p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
