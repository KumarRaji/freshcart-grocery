import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md px-6 py-3 font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-brand-green text-white hover:bg-brand-green-dark focus:ring-brand-green',
    secondary: 'bg-neutral-dark text-white hover:bg-gray-700 focus:ring-neutral-dark',
    outline:
      'bg-transparent border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white focus:ring-brand-green',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
