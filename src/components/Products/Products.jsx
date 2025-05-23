import React, { useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../ProductCard/ProductCard';
import Loading from '../Loading/Loading';
import AppContext from '../../context/AppContext';
import { getItemLocalStorage } from '../../utils/setLocalStorage';
import styles from './Products.module.css';

export default function Products() {
  const { products, loading, setCartItems, loadProducts } = useContext(AppContext);
  
  useEffect(() => {
    const initializeProducts = async () => {
      try {
        const savedCart = getItemLocalStorage('cart') || [];
        setCartItems(savedCart);
        await loadProducts();
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    initializeProducts();
  }, []);

  if (loading) return <Loading />;
  
  if (!products || products.length === 0) {
    return (
      <div className={styles.container}>
        <p>No products found. Please try again later.</p>
      </div>
    );
  }

  return (
    <motion.section 
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </motion.section>
  );
}
