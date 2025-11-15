import React, { useState, useEffect, useCallback } from 'react';
import { products, categories } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { CategoryCard } from '../components/CategoryCard';
import { ChevronLeftIcon } from '../components/icons/ChevronLeftIcon';
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';

const slides = [
  {
    id: 1,
    bgColor: 'bg-purple-50',
    title: 'Protein Power-up',
    subtitle: 'Supplements to make your workouts better.',
    offerText: 'UP TO 50% OFF',
    button: {
      text: 'SHOP NOW',
      link: 'health-wellness',
    },
    images: {
      product1: 'https://picsum.photos/seed/multivitamin/400/400', // multivitamin
      product2: 'https://picsum.photos/seed/protein/400/400', // whey
      product3: 'https://picsum.photos/seed/massgainer/400/400', // mass tech
      background: 'https://picsum.photos/seed/fitness/1200/400', // background illustration
    },
  },
  {
    id: 2,
    bgColor: 'bg-green-50',
    title: 'Farm Fresh',
    subtitle: 'The best quality produce, dairy, and meats right to your doorstep.',
    offerText: 'DEALS FROM ₹49',
    button: {
      text: 'Shop Produce',
      link: 'fresh-produce',
    },
    images: {
      background:
        'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop',
    },
  },
  {
    id: 3,
    bgColor: 'bg-yellow-50',
    title: 'Household Essentials',
    subtitle: 'All your household needs, from cleaning supplies to kitchenware.',
    offerText: 'SAVE UP TO 30%',
    button: {
      text: 'Explore Now',
      link: 'cleaning-household',
    },
    images: {
      background:
        'https://images.unsplash.com/photo-1587303355415-3ee328ab144e?q=80&w=2070&auto=format&fit=crop',
    },
  },
];

const HeroSlider = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setTimeout(nextSlide, 5000); // Auto-slide every 5 seconds
    return () => clearTimeout(timer);
  }, [currentIndex, nextSlide]);

  return (
    <section className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
      <div className="w-full h-full relative">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${slide.bgColor} ${
              currentIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* The main banner from the image */}
            {slide.id === 1 && slide.images.background && (
              <>
                <img
                  src={slide.images.background}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-between px-12">
                  {/* Left Text Content */}
                  <div className="relative z-10 max-w-lg text-left">
                    <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                      {slide.subtitle}
                    </p>
                    <p className="mt-6 text-6xl font-bold text-red-500">
                      {slide.offerText}
                    </p>
                    <button
                      onClick={() => onNavigate(slide.button.link)}
                      className="mt-8 flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
                    >
                      <span>{slide.button.text}</span>
                      <ArrowRightIcon className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Right Image Content */}
                  <div className="relative w-1/2 h-full hidden md:block">
                    <img
                      src={slide.images.product1}
                      alt="Multivitamin"
                      className="absolute bottom-10 right-48 w-40 h-auto z-20"
                    />
                    <img
                      src={slide.images.product2}
                      alt="Whey Protein"
                      className="absolute bottom-10 right-10 w-64 h-auto z-30"
                    />
                    <img
                      src={slide.images.product3}
                      alt="Mass Gainer"
                      className="absolute bottom-10 right-0 w-56 h-auto z-20 translate-x-12"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Fallback for other slides */}
            {slide.id !== 1 && (
              <>
                <img
                  src={slide.images.background}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-8">
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-200">
                    {slide.subtitle}
                  </p>
                  <p className="mt-6 text-4xl font-bold text-yellow-300">
                    {slide.offerText}
                  </p>
                  <button
                    onClick={() => onNavigate(slide.button.link)}
                    className="mt-8 flex items-center justify-center gap-2 px-8 py-3 bg-brand-green text-white font-bold rounded-md hover:bg-brand-green-dark transition-colors"
                  >
                    <span>{slide.button.text}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-20 bg-white/70 hover:bg-white rounded-full p-3 shadow-md transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-20 bg-white/70 hover:bg-white rounded-full p-3 shadow-md transition-colors"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-6 w-6 text-gray-800" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-white w-6' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

const ProductCarouselSection = ({
  title,
  products: sectionProducts,
  onAddToCart,
  onShowMore,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 4;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + productsPerPage;
      return newIndex >= sectionProducts.length ? prevIndex : newIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - productsPerPage;
      return newIndex < 0 ? 0 : newIndex;
    });
  };

  const displayedProducts = sectionProducts.slice(
    currentIndex,
    currentIndex + productsPerPage
  );
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex + productsPerPage < sectionProducts.length;

  if (sectionProducts.length === 0) return null;

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={onShowMore}
            className="font-semibold text-brand-green hover:underline"
          >
            Show More
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label={`Previous ${title}`}
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label={`Next ${title}`}
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export const HomePage = ({ onAddToCart, onNavigate }) => {
  const categorySections = [
    {
      title: 'Health & Wellness',
      categoryId: 'health-wellness',
      categoryName: 'Health & Wellness',
    },
    {
      title: 'Rice & Rice Products',
      categoryId: 'rice-products',
      categoryName: 'Rice & Rice Products',
    },
    {
      title: 'Beverages',
      categoryId: 'beverages',
      categoryName: 'Beverages',
    },
    {
      title: 'Snacks Store',
      categoryId: 'snacks-store',
      categoryName: 'Snacks Store',
    },
    {
      title: 'Cleaning & Household',
      categoryId: 'cleaning-household',
      categoryName: 'Cleaning & Household',
    },
    {
      title: 'Beauty & Hygiene',
      categoryId: 'beauty-hygiene',
      categoryName: 'Beauty & Hygiene',
    },
    {
      title: 'Home & Kitchen',
      categoryId: 'home-kitchen',
      categoryName: 'Home & Kitchen',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <HeroSlider onNavigate={onNavigate} />

      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.slice(0, 6).map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => onNavigate(category.id)}
            />
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <ProductCarouselSection
        title="Best Sellers"
        products={products}
        onAddToCart={onAddToCart}
        onShowMore={() => onNavigate('products')}
      />

      {/* Dynamic Category Sections */}
      {categorySections.map((section) => (
        <ProductCarouselSection
          key={section.categoryId}
          title={section.title}
          products={products.filter(
            (p) => p.category === section.categoryName
          )}
          onAddToCart={onAddToCart}
          onShowMore={() => onNavigate(section.categoryId)}
        />
      ))}
    </div>
  );
};
