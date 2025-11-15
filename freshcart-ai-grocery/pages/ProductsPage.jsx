import React from 'react';
import { products } from '../constants';
import { ProductCard } from '../components/ProductCard';

export const ProductsPage = ({ onAddToCart, searchQuery }) => {
  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <div>
      {searchQuery ? (
        <h1 className="text-4xl font-extrabold mb-8 pb-4 border-b-2 border-brand-green">
          Search results for "{searchQuery}"
        </h1>
      ) : (
        <h1 className="text-4xl font-extrabold mb-8 pb-4 border-b-2 border-brand-green">
          All Products
        </h1>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-neutral-dark">
            No products found
          </h2>
          <p className="mt-2 text-gray-500">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  );
};
