import { useState, useCallback } from 'react';
import fetchProducts from '../API/fetchProducts';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = useCallback(async (query = '') => {
    if (loading) return; // Prevent multiple simultaneous calls
    
    setLoading(true);
    try {
      const data = await fetchProducts(query);
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return {
    products,
    setProducts,
    loading,
    setLoading,
    loadProducts
  };
} 