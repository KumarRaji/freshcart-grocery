import React, { useState } from 'react';
import { LeafIcon } from './icons/LeafIcon';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { UserIcon } from './icons/UserIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { SearchIcon } from './icons/SearchIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { categories } from '../constants';

export const Header = ({
  onNavigate,
  onCartClick,
  cartItemCount,
  onSearch,
  isLoggedIn,
  currentUser,
  onLogout,
}) => {
  const [isShopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [isMobileShopDropdownOpen, setMobileShopDropdownOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      onSearch(localSearchQuery.trim());
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-40 w-full border-b border-neutral-medium">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-2xl font-bold text-brand-green-dark hover:text-brand-green transition-colors"
          >
            <LeafIcon className="h-8 w-8" />
            <span>FreshCart</span>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className="text-lg font-medium text-neutral-dark hover:text-brand-green transition-colors"
            >
              Home
            </button>

            <div
              className="relative"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button
                onClick={() => onNavigate('products')}
                className="flex items-center gap-1 text-lg font-medium text-neutral-dark hover:text-brand-green transition-colors"
                aria-haspopup="true"
                aria-expanded={isShopDropdownOpen}
              >
                Categories
                <ChevronDownIcon
                  className={`h-5 w-5 transition-transform duration-200 ${
                    isShopDropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
              {isShopDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-2" role="menu" aria-orientation="vertical">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          onNavigate(category.id);
                          setShopDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-md text-neutral-dark hover:bg-neutral-light hover:text-brand-green transition-colors"
                        role="menuitem"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('offers')}
              className="text-lg font-medium text-neutral-dark hover:text-brand-green transition-colors"
            >
              Today Offers
            </button>

            <button
              onClick={() => onNavigate('recipes')}
              className="flex items-center gap-2 text-lg font-medium text-neutral-dark hover:text-brand-green transition-colors"
            >
              AI Recipes
              <SparklesIcon className="h-5 w-5 text-yellow-500" />
            </button>
          </nav>

          {/* Actions & Search */}
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearchSubmit} className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="w-40 bg-neutral-light border border-neutral-medium rounded-full py-2 pl-9 pr-3 text-sm text-neutral-dark focus:outline-none focus:ring-2 focus:ring-brand-green transition-all duration-300 focus:w-48"
              />
              <button
                type="submit"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-dark/60 hover:text-brand-green"
                aria-label="Search"
              >
                <SearchIcon className="h-5 w-5" />
              </button>
            </form>

            {isLoggedIn && currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  onBlur={() => setTimeout(() => setUserMenuOpen(false), 150)}
                  className="flex items-center gap-2 p-2 text-neutral-dark hover:text-brand-green transition-colors"
                  aria-haspopup="true"
                  aria-expanded={isUserMenuOpen}
                >
                  <UserIcon className="h-7 w-7" />
                  <span className="hidden lg:inline font-medium">
                    Hi, {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isUserMenuOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-xl ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-light"
                      >
                        My Account
                      </a>
                      <button
                        onClick={() => {
                          onLogout();
                          setUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-light"
                        role="menuitem"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="p-2 text-neutral-dark hover:text-brand-green transition-colors"
                aria-label="Login or Sign up"
              >
                <UserIcon className="h-7 w-7" />
              </button>
            )}

            <button
              onClick={onCartClick}
              className="relative p-2 text-neutral-dark hover:text-brand-green transition-colors"
              aria-label={`Open shopping cart with ${cartItemCount} items`}
            >
              <ShoppingCartIcon className="h-7 w-7" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 block h-6 w-6 rounded-full bg-brand-green text-white text-xs font-bold flex items-center justify-center transform translate-x-1/3 -translate-y-1/3">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="md:hidden relative py-2 border-t border-neutral-medium"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className="w-full bg-neutral-light border border-neutral-medium rounded-full py-2 pl-10 pr-4 text-sm text-neutral-dark focus:outline-none focus:ring-2 focus:ring-brand-green"
          />
          <button
            type="submit"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-dark/60 hover:text-brand-green"
            aria-label="Search"
          >
            <SearchIcon className="h-5 w-5" />
          </button>
        </form>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center justify-around py-2 border-t border-neutral-medium">
          <button
            onClick={() => onNavigate('home')}
            className="text-sm font-medium text-neutral-dark hover:text-brand-green transition-colors"
          >
            Home
          </button>

          <div className="relative">
            <button
              onClick={() => setMobileShopDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1 text-sm font-medium text-neutral-dark hover:text-brand-green transition-colors"
              aria-haspopup="true"
              aria-expanded={isMobileShopDropdownOpen}
            >
              Categories
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform duration-200 ${
                  isMobileShopDropdownOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>
            {isMobileShopDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        onNavigate(category.id);
                        setMobileShopDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-xs text-neutral-dark hover:bg-neutral-light hover:text-brand-green"
                      role="menuitem"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('offers')}
            className="text-sm font-medium text-neutral-dark hover:text-brand-green transition-colors"
          >
            Today Offers
          </button>

          <button
            onClick={() => onNavigate('recipes')}
            className="flex items-center gap-1 text-sm font-medium text-neutral-dark hover:text-brand-green transition-colors"
          >
            AI Recipes
            <SparklesIcon className="h-4 w-4 text-yellow-500" />
          </button>
        </nav>
      </div>
    </header>
  );
};
