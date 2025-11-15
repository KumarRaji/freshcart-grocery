import React from 'react';
import { products } from '../constants';
import { ProductCard } from '../components/ProductCard';

export const TodayOffersPage = ({ onAddToCart }) => {
  const offerProducts = products.filter(
    (p) => p.originalPrice && p.originalPrice > p.price
  );

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Today&apos;s Special Offers
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Don&apos;t miss out on these amazing deals, available for a limited
          time only!
        </p>
      </div>

      {offerProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {offerProducts.map((product) => (
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
            No special offers today!
          </h2>
          <p className="mt-2 text-gray-500">
            Please check back later for new deals.
          </p>
        </div>
      )}
    </div>
  );
};
