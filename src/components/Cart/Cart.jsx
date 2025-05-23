import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { BsWhatsapp } from 'react-icons/bs';
import CartItem from '../cartItem/CartItem';
import ShippingCalculator from '../ShippingCalculator/ShippingCalculator';
import PaymentMethod from '../PaymentMethod/PaymentMethod';
import QRCodePayment from '../QRCodePayment/QRCodePayment';
import AppContext from '../../context/AppContext';
import formatCurrency from '../../utils/formatCurrency';
import styles from './Cart.module.css';
import { useContext } from 'react';

export default function Cart() {
  const { cartItems, isCartVisible, setIsCartVisible, shippingInfo, paymentMethod } = useContext(AppContext);

  const totalPrice = () => {
    const itemsTotal = cartItems.reduce((acc, item) => item.price * (item.quantity || 1) + acc, 0);
    const shippingCost = shippingInfo && typeof shippingInfo.value === 'number' ? shippingInfo.value : 0;
    return itemsTotal + shippingCost;
  };

  const formatOrderMessage = () => {
    const header = '*🛒 Novo Pedido Realizado!*\n\n';
  
    const items = cartItems.map((item, index) => {
      const quantity = item.quantity || 1;
      const itemSubtotal = item.price * quantity;
      return `*${index + 1}. ${item.title}*\n` +
             `- Quantidade: ${quantity}x\n` +
             `- Unitário: ${formatCurrency(item.price, 'USD')}\n` +
             `- Subtotal: ${formatCurrency(itemSubtotal, 'USD')}`;
    }).join('\n\n');
  
    const itemsTotal = cartItems.reduce((acc, item) => {
      const quantity = item.quantity || 1;
      return acc + (item.price * quantity);
    }, 0);
  
    const subtotal = `\n\n*Resumo do Pedido*\nSubtotal: ${formatCurrency(itemsTotal, 'USD')}`;
  
    const shipping = shippingInfo && typeof shippingInfo.value === 'number'
      ? `\nFrete: ${formatCurrency(shippingInfo.value, 'USD')}`
      : '\nFrete: Não calculado';
  
    const total = `\nTotal Final: ${formatCurrency(totalPrice(), 'USD')}`;
  
    const deliveryInfo = shippingInfo?.address
      ? '\n\n*Endereço de Entrega*\n' +
        `Cidade: ${shippingInfo.address.city || 'Não informada'}\n` +
        `Estado: ${shippingInfo.address.state || 'Não informado'}\n` +
        (shippingInfo.address.neighborhood ? `Bairro: ${shippingInfo.address.neighborhood}\n` : '') +
        (shippingInfo.deadline ? `Prazo estimado: ${shippingInfo.deadline}` : '')
      : '\n\nEndereço não informado';
  
    const paymentInfo = paymentMethod
      ? '\n\n*Pagamento*\n' +
        `${paymentMethod === 'cash' ? 'Pagamento na entrega' : 'PIX'}\n` +
        `Status: ${paymentMethod === 'cash' ? 'Aguardando pagamento' : 'Pago via PIX'}`
      : '\n\nPagamento não informado';
  
    const footer = '\n\nObrigado pela preferência!';
  
    return header + items + subtotal + shipping + total + deliveryInfo + paymentInfo + footer;
  };
  

  const handleWhatsAppShare = () => {
    if (!shippingInfo || !paymentMethod) return;
  
    const numero = '5521980248660'; // número no formato internacional
    const message = encodeURIComponent(formatOrderMessage());
    const whatsappUrl = `https://wa.me/${numero}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartVisible && (
        <motion.div
          className={styles.cart}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <button 
            type="button"
            className={styles.closeButton}
            onClick={() => setIsCartVisible(false)}
          >
            <IoMdClose />
          </button>

          <div className={styles.items}>
            {cartItems.length === 0 ? (
              <p className={styles.emptyMessage}>Seu carrinho está vazio</p>
            ) : (
              <>
                {cartItems.map((item) => <CartItem key={item.id} data={item} />)}
                <ShippingCalculator />
                <PaymentMethod />
                <QRCodePayment />
              </>
            )}
          </div>
          
          <div className={styles.footer}>
            <div className={styles.total}>
              <span className={styles.totalLabel}>Total:</span>
              <span className={styles.totalValue}>
                {formatCurrency(totalPrice(), 'USD')}
              </span>
            </div>
            {cartItems.length > 0 && (
              <div className={styles.buttons}>
                <motion.button
                  className={`${styles.whatsappButton} ${(!shippingInfo || !paymentMethod) ? styles.disabled : ''}`}
                  onClick={handleWhatsAppShare}
                  disabled={!shippingInfo || !paymentMethod}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BsWhatsapp />
                  {!shippingInfo 
                    ? 'Calcule o Frete Primeiro'
                    : !paymentMethod
                    ? 'Selecione o Método de Pagamento'
                    : 'Enviar Pedido no WhatsApp'}
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
