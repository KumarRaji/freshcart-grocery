import React from 'react';
import { LeafIcon } from './icons/LeafIcon';

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-neutral-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-2xl font-bold"
            >
              <LeafIcon className="h-8 w-8 text-brand-green" />
              <span>FreshCart</span>
            </button>
            <p className="mt-4 text-gray-400 text-sm">
              Your daily dose of fresh, delivered right to your door.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('offers')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Today Offers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fresh-produce')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Fresh Produce
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dairy-eggs')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Dairy & Eggs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('meat-seafood')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Meat & Seafood
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('bakery')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Bakery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('health-wellness')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Health & Wellness
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('baby-care')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Baby Care
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">About Us</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Help</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Shipping
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} FreshCart AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
