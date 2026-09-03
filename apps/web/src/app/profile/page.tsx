export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings & Profile</h1>
        <p className="text-gray-500 mt-2">Manage your app preferences and data.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-bold text-gray-800">Profile Information</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
            <input type="text" defaultValue="Test User" className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Currency</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2">
                <option>TRY</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2">
                <option>Europe/Istanbul</option>
                <option>UTC</option>
              </select>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Changes</button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-bold text-gray-800">Data Management</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 border-r pr-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Export & Backup</h3>
            <button className="w-full text-left px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">📥 Download Collection (JSON)</button>
            <button className="w-full text-left px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">📥 Download Collection (CSV)</button>
            <button className="w-full text-left px-4 py-2 border border-blue-300 text-blue-700 rounded hover:bg-blue-50 mt-4">💾 Create Database Backup</button>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Restore & Danger Zone</h3>
            <button className="w-full text-left px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">📤 Restore from Backup</button>
            <div className="pt-4">
              <button className="w-full text-left px-4 py-2 border border-red-300 text-red-600 rounded hover:bg-red-50">⚠️ Reset All Data</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
