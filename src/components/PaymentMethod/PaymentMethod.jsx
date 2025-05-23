import { useContext } from 'react';
import { motion } from 'framer-motion';
import { BsCashStack, BsQrCode } from 'react-icons/bs';
import AppContext from '../../context/AppContext';
import styles from './PaymentMethod.module.css';

export default function PaymentMethod() {
  const { paymentMethod, setPaymentMethod } = useContext(AppContext);

  return (
    <div className={styles.paymentMethod}>
      <h3 className={styles.title}>Método de Pagamento</h3>
      
      <div className={styles.options}>
        <motion.button
          type="button"
          className={`${styles.option} ${paymentMethod === 'cash' ? styles.selected : ''}`}
          onClick={() => setPaymentMethod('cash')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <BsCashStack className={styles.icon} />
          <span>Pagar na Entrega</span>
        </motion.button>

        <motion.button
          type="button"
          className={`${styles.option} ${paymentMethod === 'qrcode' ? styles.selected : ''}`}
          onClick={() => setPaymentMethod('qrcode')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <BsQrCode className={styles.icon} />
          <span>Pagar via QR Code</span>
        </motion.button>
      </div>
    </div>
  );
} 