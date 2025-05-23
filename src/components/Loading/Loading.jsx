import { BiLoaderAlt } from 'react-icons/bi';
import { motion } from 'framer-motion';
import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <BiLoaderAlt className={styles.icon} />
      </motion.div>
    </div>
  );
}
