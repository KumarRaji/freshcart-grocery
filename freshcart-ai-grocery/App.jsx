// App.jsx
import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { RecipeSuggesterPage } from './pages/RecipeSuggesterPage';
import { ShoppingCart } from './components/ShoppingCart';
import { products, categories } from './constants';
import { TodayOffersPage } from './pages/TodayOffersPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CategoryPage } from './pages/CategoryPage';
import { CheckoutPage } from './pages/CheckoutPage';

// In JS we just treat page as a string; all valid values are the same as before.
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigateTo = (page) => {
    setCurrentPage(page);
    if (page === 'products') {
      setSearchQuery('');
    }
    window.scrollTo(0, 0);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage('products');
    window.scrollTo(0, 0);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    navigateTo('home');
  };

  const handleRegister = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    navigateTo('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigateTo('home');
  };

  const handleAddToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const handleUpdateQuantity = useCallback((productId, quantity) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.id !== productId);
      }
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const handleRemoveFromCart = useCallback((productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }, []);

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const renderPage = () => {
    const category = categories.find((c) => c.id === currentPage);

    switch (currentPage) {
      case 'home':
        return <HomePage onAddToCart={handleAddToCart} onNavigate={navigateTo} />;
      case 'products':
        return (
          <ProductsPage
            onAddToCart={handleAddToCart}
            searchQuery={searchQuery}
          />
        );
      case 'recipes':
        return <RecipeSuggesterPage />;
      case 'offers':
        return <TodayOffersPage onAddToCart={handleAddToCart} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={navigateTo} />;
      case 'register':
        return <RegisterPage onRegister={handleRegister} onNavigate={navigateTo} />;
      case 'checkout':
        return (
          <CheckoutPage
            cartItems={cartItems}
            onPlaceOrder={(order) => {
              // simple place-order handler: clear cart and navigate home
              setCartItems([]);
              alert('Order placed successfully! Thank you.');
              navigateTo('home');
            }}
            onNavigate={navigateTo}
          />
        );
      default:
        if (category) {
          return (
            <CategoryPage
              category={category}
              onAddToCart={handleAddToCart}
            />
          );
        }
        return <HomePage onAddToCart={handleAddToCart} onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="bg-neutral-light min-h-screen flex flex-col font-sans text-neutral-dark">
      <Header
        onNavigate={navigateTo}
        onCartClick={() => setIsCartOpen(true)}
        cartItemCount={cartItemCount}
        onSearch={handleSearch}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
      <Footer onNavigate={navigateTo} />
      <ShoppingCart
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          navigateTo('checkout');
        }}
      />
    </div>
  );
};

export default App;
