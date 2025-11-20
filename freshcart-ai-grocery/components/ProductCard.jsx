import React from 'react';
import { WishlistIcon } from './icons/WishlistIcon';
import { ClockIcon } from './icons/ClockIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

export const ProductCard = ({ product, onAddToCart }) => {
  const isOffer =
    typeof product.originalPrice === 'number' &&
    product.originalPrice > product.price;

  const discountPercentage = isOffer
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 flex flex-col group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        {isOffer && (
          <div className="absolute top-0 left-0 bg-brand-green text-white text-xs font-bold px-3 py-1.5 rounded-br-lg z-10">
            {discountPercentage}% OFF
          </div>
        )}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-40 object-cover rounded-t-lg"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        {/* Top section of text */}
        <div>
          <div className="flex justify-between items-start">
            <p className="text-gray-500 text-sm">{product.brand}</p>
            <div className="flex items-center gap-1 text-xs font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
              <ClockIcon className="w-3 h-3" />
              <span>{product.deliveryTime}</span>
            </div>
          </div>
          <h3 className="text-md font-semibold text-neutral-dark mt-1 h-12">
            {product.name}
          </h3>

          <button className="mt-2 w-full text-left border border-gray-200 rounded p-2 text-sm text-gray-700 flex justify-between items-center hover:bg-gray-50 transition-colors">
            <span>{product.unit}</span>
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Bottom section */}
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-bold text-neutral-dark">₹{product.price}</p>
            {isOffer && (
              <p className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice}
              </p>
            )}
          </div>

          {product.offerTag && (
            <button className="mt-2 w-full text-left bg-green-50/80 border border-green-200 rounded p-2 text-sm text-green-800 font-semibold flex justify-between items-center hover:bg-green-100 transition-colors">
              <span>{product.offerTag}</span>
              <ChevronDownIcon className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-2 mt-3">
            <button
              className="p-3 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100 hover:border-gray-400 transition-colors"
              aria-label="Save for later"
            >
              <WishlistIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="flex-grow text-center py-2.5 px-4 border-2 border-red-200 text-red-600 font-bold rounded-md hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
