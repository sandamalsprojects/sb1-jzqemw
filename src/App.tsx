import React, { useState } from 'react';
import { Pill, Search, Building2 } from 'lucide-react';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import type { Product } from './types/Product';

// Simulated products data
const PRODUCTS_PER_PAGE = 20;
const MOCK_PRODUCTS: Product[] = Array.from({ length: 60 }, (_, i) => ({
  id: `prod-${i + 1}`,
  code: `CODE${i + 1}`,
  active_ingredient: "Paracetamol",
  administration_route: "Oral",
  category: "Pain Relief",
  commercial_name: `PharmaMed ${i + 1}`,
  dosage: "500mg",
  generic: i % 3 === 0,
  ma_date: "2024-01-01",
  ma_number: `MA${i + 1}`,
  ma_status: "Active",
  manufac_h: "PharmaCorp",
  name: `Medicine ${i + 1}`,
  pharmaceutical_form: "Tablet",
  prescription_type: "OTC",
  producer: "PharmaCorp Inc",
  product_code: `PC${i + 1}`,
  product_id: `${i + 1}`,
  source: "Direct",
  therapeutic_area: "Pain Management",
  therapeutic_group: "Analgesics",
  therapeutic_indication: "Pain Relief",
  price: 29.99 + i,
  min_order_quantity: 100,
  image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  short_description: "High-quality pharmaceutical product for effective pain relief"
}));

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = MOCK_PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.active_ingredient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handleBuy = (product: Product) => {
    // Implement Stripe integration here
    console.log('Buying product:', product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Pill className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">PharmaMarket</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600">
                <Building2 className="w-5 h-5 mr-2" />
                Vendor Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuy={handleBuy}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500">
            © 2024 PharmaMarket. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;