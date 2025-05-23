import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import formatCurrency from '../../utils/formatCurrency';
import AppContext from '../../context/AppContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ data }) {
  const { price, title, thumbnail } = data;
  const { addToCart } = useContext(AppContext);

  const handleAddToCart = () => {
    if (typeof addToCart === 'function') {
      addToCart(data);
    } else {
      console.error('addToCart is not a function');
    }
  };

  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.imageContainer}>
        <img
          src={thumbnail}
          alt={title}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.price}>
          {formatCurrency(price, 'USD')}
        </h2>
        <h3 className={styles.title}>
          {title}
        </h3>
        <button
          type="button"
          onClick={handleAddToCart}
          className={styles.button}
        >
          <BsFillCartPlusFill className={styles.icon} />
        </button>
      </div>
    </motion.div>
  );
}

ProductCard.propTypes = {
  data: propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    thumbnail: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
  }).isRequired,
};
