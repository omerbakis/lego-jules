'use client';
import { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '../../../components/ui/Table';
import { Badge } from '../../../components/ui/Badge';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Modal } from '../../../components/ui/Modal';

interface Merchant {
  name: string;
}

interface Product {
  id: string;
  title: string;
  classification: string;
  matchConfidence: number | null;
  merchant?: Merchant;
}

export default function MatchingAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'UNCLASSIFIED' | 'SUSPICIOUS'>('UNCLASSIFIED');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/merchant-products`);
      if (res.ok) {
        const data: Product[] = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClassify = (id: string, classification: string) => {
    alert(`Mock classify product ${id} as ${classification}`);
  };

  const openSearchModal = (id: string) => {
    setSelectedProductId(id);
    setIsSearchModalOpen(true);
  };

  const executeSearchMatch = () => {
    alert(`Mock link product ${selectedProductId} to set matching "${searchQuery}"`);
    setIsSearchModalOpen(false);
    setSearchQuery('');
  };

  const displayedProducts = products.filter(p => {
    if (activeTab === 'UNCLASSIFIED') return p.classification === 'UNKNOWN';
    if (activeTab === 'SUSPICIOUS') return p.classification !== 'UNKNOWN' && (p.matchConfidence !== null && p.matchConfidence < 0.7);
    return false;
  });

  if (loading) return <LoadingSpinner text="Loading pending products..." />;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Product Matching</h1>
        <p className="text-gray-500 mt-2">Review unclassified and low-confidence matches from merchant scans.</p>
      </div>

      <div className="flex space-x-4 border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium border-b-2 ${activeTab === 'UNCLASSIFIED' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('UNCLASSIFIED')}
        >
          Unclassified
        </button>
        <button
          className={`px-4 py-2 font-medium border-b-2 ${activeTab === 'SUSPICIOUS' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('SUSPICIOUS')}
        >
          Suspicious Matches (&lt; 0.7)
        </button>
      </div>

      <Card title={`${activeTab === 'UNCLASSIFIED' ? 'Pending Classification' : 'Review Required'} (${displayedProducts.length})`}>
        {displayedProducts.length === 0 ? (
          <EmptyState title="All caught up!" description={`There are no products in the ${activeTab} category.`} />
        ) : (
          <Table>
            <TableHeader>
              <TableHead>Product Title</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableHeader>
            <TableBody>
              {displayedProducts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium max-w-md truncate" title={p.title}>{p.title}</TableCell>
                  <TableCell>{p.merchant?.name || 'Unknown'}</TableCell>
                  <TableCell>
                    {activeTab === 'UNCLASSIFIED' ? (
                      <Badge variant="warning">UNKNOWN</Badge>
                    ) : (
                      <Badge variant="danger">LOW CONFIDENCE</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <select
                      className="text-sm border border-gray-300 rounded px-2 py-1 mr-2"
                      onChange={(e) => handleClassify(p.id, e.target.value)}
                      defaultValue=""
                    >
                      <option value="" disabled>Quick Classify</option>
                      <option value="LEGO_SET">LEGO Set</option>
                      <option value="ACCESSORY">Accessory</option>
                      <option value="NOT_LEGO">Not Lego</option>
                    </select>
                    <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => openSearchModal(p.id)}>Search Set</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <Modal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} title="Search LEGO Set">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Search the catalog to manually link this product to a specific LEGO set.</p>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter set number or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={() => setIsSearchModalOpen(false)}>Cancel</Button>
            <Button onClick={executeSearchMatch}>Link Set</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
