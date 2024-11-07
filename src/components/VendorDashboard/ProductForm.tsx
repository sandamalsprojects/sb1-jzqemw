import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import type { Product } from '../../types/Product';

interface ProductFormProps {
  initialProduct?: Partial<Product>;
  onSubmit: (product: Partial<Product>) => Promise<void>;
  onCancel: () => void;
}

export default function ProductForm({ initialProduct, onSubmit, onCancel }: ProductFormProps) {
  const [product, setProduct] = useState<Partial<Product>>(initialProduct || {});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onSubmit(product);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Commercial Name</label>
          <input
            type="text"
            value={product.commercial_name || ''}
            onChange={(e) => setProduct({ ...product, commercial_name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            step="0.01"
            value={product.price || ''}
            onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Minimum Order Quantity</label>
          <input
            type="number"
            value={product.min_order_quantity || ''}
            onChange={(e) => setProduct({ ...product, min_order_quantity: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={product.vendor_commission || ''}
            onChange={(e) => setProduct({ ...product, vendor_commission: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  );
}