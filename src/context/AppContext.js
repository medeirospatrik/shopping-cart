import { createContext } from 'react';

const AppContext = createContext({
  // Cart
  cartItems: [],
  setCartItems: () => {},
  isCartVisible: false,
  setIsCartVisible: () => {},
  addToCart: () => {},
  removeFromCart: () => {},

  // Products
  products: [],
  setProducts: () => {},
  loading: true,
  setLoading: () => {},
  loadProducts: () => {},

  // Shipping
  shippingInfo: null,
  setShippingInfo: () => {},
  calculateShipping: () => {},

  // Payment
  paymentMethod: null,
  setPaymentMethod: () => {},
});

export default AppContext;
