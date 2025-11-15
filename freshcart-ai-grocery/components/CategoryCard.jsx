import React from 'react';

export const CategoryCard = ({ category, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative rounded-lg overflow-hidden group w-full text-left transition-transform duration-300 hover:scale-105"
    >
      <img
        src={category.imageUrl}
        alt={category.name}
        className="w-full h-40 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-xl font-bold text-white">{category.name}</h3>
      </div>
    </button>
  );
};
