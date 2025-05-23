import { useContext } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import formatCurrency from '../../utils/formatCurrency';
import AppContext from '../../context/AppContext';
import styles from './CartItem.module.css';

export default function CartItem({ data }) {
  const { cartItems, setCartItems } = useContext(AppContext);
  const { id, thumbnail, title, price, quantity = 1 } = data;

  const handleRemoveItem = () => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 50) return;

    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={styles.item}
    >
      <div className={styles.imageContainer}>
        <img
          src={thumbnail.replace(/\w\.jpg/gi, 'W.jpg')}
          alt={title}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          <h3 className={styles.title}>
            {title}
          </h3>
          <div className={styles.priceQuantity}>
            <p className={styles.price}>
              {formatCurrency(price, 'USD')}
            </p>
            <div className={styles.quantityControls}>
              <button
                type="button"
                className={styles.quantityButton}
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                −
              </button>
              
              <input
                type="number"
                min="1"
                max="50"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className={styles.quantityInput}
              />
              
              <button
                type="button"
                className={styles.quantityButton}
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 50}
              >
                +
              </button>
            </div>
          </div>
          <button
            type="button"
            className={styles.removeButton}
            onClick={handleRemoveItem}
          >
            Excluir
          </button>
        </div>
      </div>
    </motion.div>
  );
}

CartItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
};
