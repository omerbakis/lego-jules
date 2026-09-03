'use client';
import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Modal } from '../../components/ui/Modal';

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [displayName, setDisplayName] = useState('');
  const [currency, setCurrency] = useState('TRY');
  const [timezone, setTimezone] = useState('Europe/Istanbul');

  const [resetModalOpen, setResetModalOpen] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // Mocking AppProfile id = 1 or getting the first one
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/app-profiles`);
      if (!res.ok) throw new Error('Failed to load profile');
      const data = await res.json();

      let p = data[0];
      if (!p) {
        // Fallback mock
        p = { id: '1', displayName: 'Collector', preferredCurrency: 'TRY', timezone: 'Europe/Istanbul' };
      }

      setProfile(p);
      setDisplayName(p.displayName || '');
      setCurrency(p.preferredCurrency || 'TRY');
      setTimezone(p.timezone || 'Europe/Istanbul');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { displayName, preferredCurrency: currency, timezone };
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/app-profiles/${profile.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save profile');
      alert('Profile updated successfully');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading profile..." />;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings & Profile</h1>
        <p className="text-gray-500 mt-2">Manage your app preferences and data.</p>
      </div>

      <Card title="Profile Information">
        <div className="p-6 space-y-4">
          <Input
            label="Display Name"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Preferred Currency"
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              options={[
                { value: 'TRY', label: 'TRY (Turkish Lira)' },
                { value: 'USD', label: 'USD (US Dollar)' },
                { value: 'EUR', label: 'EUR (Euro)' }
              ]}
            />
            <Select
              label="Timezone"
              value={timezone}
              onChange={e => setTimezone(e.target.value)}
              options={[
                { value: 'Europe/Istanbul', label: 'Europe/Istanbul' },
                { value: 'UTC', label: 'UTC' }
              ]}
            />
          </div>
          <Button onClick={handleSave} isLoading={saving}>Save Changes</Button>
        </div>
      </Card>

      <Card title="Data Management">
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 md:border-r border-gray-100 pr-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Export & Backup</h3>
            <Button variant="secondary" className="w-full justify-start">📥 Download Collection (JSON)</Button>
            <Button variant="secondary" className="w-full justify-start">📥 Download Collection (CSV)</Button>
            <Button variant="ghost" className="w-full justify-start text-blue-600 mt-4 border border-blue-200">💾 Create Database Backup</Button>
          </div>
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Restore & Danger Zone</h3>
            <Button variant="secondary" className="w-full justify-start">📤 Restore from Backup</Button>
            <div className="pt-6">
              <Button variant="danger" className="w-full" onClick={() => setResetModalOpen(true)}>⚠️ Reset All Data</Button>
            </div>
          </div>
        </div>
      </Card>

      <Modal isOpen={resetModalOpen} onClose={() => setResetModalOpen(false)} title="Factory Reset">
        <div className="space-y-4">
          <p className="text-gray-600">Are you absolutely sure you want to reset all data? This action cannot be undone and will delete your collection, wishlist, and tracking history.</p>
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="ghost" onClick={() => setResetModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => { alert('Data reset is not implemented in this mock'); setResetModalOpen(false); }}>Yes, Delete Everything</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
