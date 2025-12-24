import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
  cartItems: number[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  getCartCount: () => number;
  isInCart: (productId: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<number[]>([]);

  const addToCart = (productId: number) => {
    setCartItems(prev => [...prev, productId]);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(id => id !== productId));
  };

  const getCartCount = () => cartItems.length;

  const isInCart = (productId: number) => cartItems.includes(productId);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getCartCount, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
