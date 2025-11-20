import React from 'react';
import { Button } from './Button';

const ShoppingCartItem = ({ item, onUpdateQuantity, onRemove }) => (
  <div className="flex items-center gap-4 py-4">
    <img
      src={item.imageUrl}
      alt={item.name}
      className="w-20 h-20 object-cover rounded-md"
    />
    <div className="flex-grow">
      <h4 className="font-semibold">{item.name}</h4>
      <p className="text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
      <div className="flex items-center mt-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="w-6 h-6 border rounded-full"
        >
          -
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-6 h-6 border rounded-full"
        >
          +
        </button>
      </div>
    </div>
    <div className="text-right">
      <p className="font-semibold">
        ₹{(item.price * item.quantity).toFixed(2)}
      </p>
      <button
        onClick={() => onRemove(item.id)}
        className="text-xs text-red-500 hover:underline mt-1"
      >
        Remove
      </button>
    </div>
  </div>
);

export const ShoppingCart = ({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemove,
  onProceedToCheckout,
}) => {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button onClick={onClose} className="p-2 text-2xl">
              &times;
            </button>
          </div>

          {/* Items */}
          <div className="flex-grow p-6 overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-gray-500 text-center mt-8">
                Your cart is empty.
              </p>
            ) : (
              <div className="divide-y">
                {items.map((item) => (
                  <ShoppingCartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Subtotal</span>
                <span className="text-2xl font-bold text-brand-green">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  if (typeof onProceedToCheckout === 'function') {
                    onProceedToCheckout();
                  }
                }}
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
