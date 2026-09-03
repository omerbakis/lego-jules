'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Card } from '../../components/ui/Card';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { EmptyState } from '../../components/ui/EmptyState';

interface LegoSet {
  id: string;
  setNumber: string;
  name: string;
}

interface WishlistItem {
  id: string;
  appProfileId: string;
  legoSetId: string;
  targetPrice: number | null;
  maximumAcceptablePrice: number | null;
  currency: string;
  priority: string;
  legoSet?: LegoSet;
  createdAt: string;
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: keyof WishlistItem, direction: 'asc' | 'desc' } | null>(null);

  // Form State
  const [legoSetId, setLegoSetId] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [priority, setPriority] = useState('MEDIUM');

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/wishlist-items`);
      if (!res.ok) throw new Error('Failed to load wishlist');
      const data: WishlistItem[] = await res.json();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this item?')) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/wishlist-items/${id}`, { method: 'DELETE' });
      setItems(items.filter(i => i.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async () => {
    if (!legoSetId) return;
    setIsSubmitting(true);
    try {
      const payload = {
        appProfileId: '1',
        legoSetId,
        targetPrice: targetPrice ? parseFloat(targetPrice) : undefined,
        maximumAcceptablePrice: maxPrice ? parseFloat(maxPrice) : undefined,
        priority
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/wishlist-items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to add item');
      setIsModalOpen(false);
      fetchWishlist();
    } catch(err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSort = (key: keyof WishlistItem) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    setItems((prevItems) => {
      return [...prevItems].sort((a, b) => {
        if (a[key] === null) return 1;
        if (b[key] === null) return -1;
        if (a[key]! < b[key]!) return direction === 'asc' ? -1 : 1;
        if (a[key]! > b[key]!) return direction === 'asc' ? 1 : -1;
        return 0;
      });
    });
  };

  if (loading) return <LoadingSpinner text="Loading your wishlist..." />;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wishlist</h1>
          <p className="text-gray-500 mt-2">Manage your target prices and priorities.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Add to Wishlist</Button>
      </div>

      <Card>
        {items.length === 0 ? (
          <EmptyState
            title="Empty Wishlist"
            description="You don't have any sets in your wishlist yet."
            action={<Button onClick={() => setIsModalOpen(true)}>Add your first set</Button>}
          />
        ) : (
          <Table>
            <TableHeader>
              <TableHead className="cursor-pointer" onClick={() => handleSort('createdAt')}>Set Number ↕</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('targetPrice')}>Target Price ↕</TableHead>
              <TableHead>Max Price</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('priority')}>Priority ↕</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-gray-600">{item.legoSet?.setNumber}</TableCell>
                  <TableCell>
                    <Link href={`/catalog/${item.legoSet?.id}`} className="font-medium text-blue-600 hover:underline">
                      {item.legoSet?.name || 'Unknown Set'}
                    </Link>
                  </TableCell>
                  <TableCell className="text-green-600 font-medium">
                    {item.targetPrice ? `${item.targetPrice} ${item.currency || 'TRY'}` : '-'}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {item.maximumAcceptablePrice ? `${item.maximumAcceptablePrice} ${item.currency || 'TRY'}` : '-'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      item.priority === 'MUST_HAVE' ? 'danger' :
                      item.priority === 'HIGH' ? 'warning' :
                      item.priority === 'LOW' ? 'default' : 'info'
                    }>
                      {item.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => alert('Edit not fully mapped here')} className="text-blue-500">Edit</Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add to Wishlist">
        <div className="space-y-4">
          <Input
            label="Lego Set ID (UUID for now)"
            value={legoSetId}
            onChange={e => setLegoSetId(e.target.value)}
            placeholder="e.g. 1234-abcd..."
          />
          <Input
            label="Target Price"
            type="number"
            value={targetPrice}
            onChange={e => setTargetPrice(e.target.value)}
            placeholder="e.g. 1500"
          />
          <Input
            label="Max Acceptable Price"
            type="number"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            placeholder="e.g. 2000"
          />
          <Select
            label="Priority"
            value={priority}
            onChange={e => setPriority(e.target.value)}
            options={[
              { value: 'LOW', label: 'Low' },
              { value: 'MEDIUM', label: 'Medium' },
              { value: 'HIGH', label: 'High' },
              { value: 'MUST_HAVE', label: 'Must Have' }
            ]}
          />
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd} isLoading={isSubmitting}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
