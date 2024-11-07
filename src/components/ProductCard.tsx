import React, { useState } from 'react';
import { ShoppingCart, Info, AlertCircle } from 'lucide-react';
import type { Product } from '../types/Product';
import { createPaymentSession } from '../utils/stripe';

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
}

export default function ProductCard({ product, onBuy }: ProductCardProps) {
  const [quantity, setQuantity] = useState(product.min_order_quantity);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuy = async () => {
    try {
      setLoading(true);
      setError(null);
      await createPaymentSession(product, quantity);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.generic && (
          <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
            Generic
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.commercial_name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.short_description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="quantity" className="text-sm font-medium text-gray-600">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min={product.min_order_quantity}
              step={10}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(product.min_order_quantity, parseInt(e.target.value)))}
              className="w-20 px-2 py-1 border rounded-md"
            />
          </div>
          <span className="text-lg font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-50 text-red-600 rounded-md flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handleBuy}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {loading ? 'Processing...' : 'Buy Now'}
          </button>
          
          <button className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors">
            <Info className="w-4 h-4 mr-1" />
            Details
          </button>
        </div>
      </div>
    </div>
  );
}