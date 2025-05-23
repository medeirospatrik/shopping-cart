import React from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { useShipping } from '../hooks/useShipping';

export default function AppProvider({ children }) {
  const {
    cartItems,
    setCartItems,
    isCartVisible,
    setIsCartVisible,
    addToCart,
    removeFromCart
  } = useCart();

  const {
    products,
    setProducts,
    loading,
    setLoading,
    loadProducts
  } = useProducts();

  const {
    shippingInfo,
    setShippingInfo,
    calculateShipping
  } = useShipping();

  const values = {
    cartItems,
    setCartItems,
    isCartVisible,
    setIsCartVisible,
    addToCart,
    removeFromCart,
    products,
    setProducts,
    loading,
    setLoading,
    loadProducts,
    shippingInfo,
    setShippingInfo,
    calculateShipping
  };

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
}; 