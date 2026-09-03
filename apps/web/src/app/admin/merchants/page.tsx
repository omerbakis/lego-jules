'use client';
import { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '../../../components/ui/Table';
import { Badge } from '../../../components/ui/Badge';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { EmptyState } from '../../../components/ui/EmptyState';

export default function MerchantsAdminPage() {
  const [merchants, setMerchants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    fetchMerchants();
  }, []);

  const fetchMerchants = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/merchants`);
      if (res.ok) {
        const data = await res.json();
        setMerchants(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const triggerScan = async () => {
    setScanning(true);
    try {
      // Mocking a scan trigger which is supposed to be connected to BullMQ queue in real scenario
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Scan triggered successfully! Background jobs have been scheduled.");
    } catch (err) {
      console.error(err);
    } finally {
      setScanning(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading merchants..." />;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Merchants & Scans</h1>
          <p className="text-gray-500 mt-2">Manage tracking adapters and manual triggers.</p>
        </div>
        <Button>+ Add Merchant</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={triggerScan}
          disabled={scanning}
          className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:border-blue-300 transition text-left disabled:opacity-50"
        >
          <h3 className="font-bold text-gray-900 mb-1">
            {scanning ? <span className="animate-spin inline-block mr-2">⏳</span> : '▶️'} Start Full Scan
          </h3>
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

      <Card title="Configured Merchants">
        {merchants.length === 0 ? (
          <EmptyState title="No merchants" description="You haven't configured any merchants yet." />
        ) : (
          <Table>
            <TableHeader>
              <TableHead>Name</TableHead>
              <TableHead>Domain</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Run</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableHeader>
            <TableBody>
              {merchants.map((m: any) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell className="text-gray-500">{m.domain}</TableCell>
                  <TableCell>
                    <Badge variant={m.isEnabled ? 'success' : 'danger'}>
                      {m.isEnabled ? 'ACTIVE' : 'DISABLED'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">{m.lastSuccessfulRunAt ? new Date(m.lastSuccessfulRunAt).toLocaleString() : 'Never'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-blue-600">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
