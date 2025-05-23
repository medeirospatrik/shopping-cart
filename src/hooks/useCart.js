import { useState } from 'react';

export function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const addToCart = (product) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      
      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === productId);
      
      if (existingItem?.quantity > 1) {
        return currentItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      
      return currentItems.filter(item => item.id !== productId);
    });
  };

  return {
    cartItems,
    setCartItems,
    isCartVisible,
    setIsCartVisible,
    addToCart,
    removeFromCart
  };
} 