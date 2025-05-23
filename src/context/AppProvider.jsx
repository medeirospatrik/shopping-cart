import { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { useShipping } from '../hooks/useShipping';

export default function AppProvider({ children }) {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  
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
    products,
    setProducts,
    cartItems,
    setCartItems,
    loading,
    setLoading,
    isCartVisible,
    setIsCartVisible,
    loadProducts,
    addToCart,
    removeFromCart,
    shippingInfo,
    setShippingInfo,
    calculateShipping,
    paymentMethod,
    setPaymentMethod,
    paymentConfirmed,
    setPaymentConfirmed
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