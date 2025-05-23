import { useContext } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { motion } from 'framer-motion';
import AppContext from '../../context/AppContext';
import styles from './CartButton.module.css';

export default function CartButton() {
  const { cartItems, isCartVisible, setIsCartVisible } = useContext(AppContext);

  return (
    <motion.button
      type="button"
      className={styles.button}
      onClick={() => setIsCartVisible(!isCartVisible)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <AiOutlineShoppingCart className={styles.icon} />
      {cartItems.length > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={styles.badge}
        >
          {cartItems.length}
        </motion.span>
      )}
    </motion.button>
  );
}
