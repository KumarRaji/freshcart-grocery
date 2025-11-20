import React, { useState } from 'react';

export const CheckoutPage = ({ cartItems = [], onPlaceOrder, onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const subtotal = cartItems.reduce((t, it) => t + it.price * it.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = { name, email, address, items: cartItems, total: subtotal };
    if (onPlaceOrder) onPlaceOrder(order);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">Order Summary</h2>
        <div className="divide-y">
          {cartItems.length === 0 && <p className="text-gray-500">Your cart is empty.</p>}
          {cartItems.map((item) => (
            <div key={item.id} className="py-3 flex justify-between items-center">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
              </div>
              <div className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold">Subtotal</span>
          <span className="text-xl font-bold text-brand-green">₹{subtotal.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Delivery Address</label>
          <textarea
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={4}
          />
        </div>

        <div className="flex gap-3">
          <button type="submit" className="px-6 py-3 bg-brand-green text-white rounded font-semibold">Place Order</button>
          <button type="button" onClick={() => onNavigate && onNavigate('home')} className="px-6 py-3 bg-gray-100 rounded">Continue Shopping</button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
