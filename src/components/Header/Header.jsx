
import { motion } from 'framer-motion';
import { BsShop } from 'react-icons/bs';
import SearchBar from '../SearchBar/SearchBar';
import CartButton from '../CartButton/CartButton';
import styles from './Header.module.css';

function Header() {
  return (
    <motion.header 
      className={styles.header}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="container">
        <div className={styles.content}>
          <motion.div 
            className={styles.logo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BsShop className={styles.logoIcon} />
            <span className={styles.logoText}>ShopCart</span>
          </motion.div>

          <nav className={styles.nav}>
            <motion.a 
              href="#" 
              className={styles.navLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Início
            </motion.a>
            <motion.a 
              href="#" 
              className={styles.navLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Categorias
            </motion.a>
            <motion.a 
              href="#" 
              className={styles.navLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ofertas
            </motion.a>
          </nav>

          <div className={styles.actions}>
            <div className={styles.search}>
              <SearchBar />
            </div>
            <div className={styles.cart}>
              <CartButton />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
