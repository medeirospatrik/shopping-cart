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
    // Cabeçalho da mensagem
    const header = '🛒 *Novo Pedido*\n\n';

    // Seção de itens com validação de quantidade
    const items = cartItems.map((item, index) => {
      const quantity = item.quantity || 1; // Garante que quantidade seja pelo menos 1
      const itemSubtotal = item.price * quantity;
      
      return `${index + 1}. *${item.title}*\n` +
        `   • Quantidade: ${quantity}x\n` +
        `   • Preço unitário: ${formatCurrency(item.price, 'USD')}\n` +
        `   • Subtotal: ${formatCurrency(itemSubtotal, 'USD')}`;
    }).join('\n\n');

    // Seção de totais com cálculos validados
    const itemsTotal = cartItems.reduce((acc, item) => {
      const quantity = item.quantity || 1;
      return acc + (item.price * quantity);
    }, 0);
    
    const subtotal = `\n\n💰 *Resumo do Pedido*\nSubtotal: ${formatCurrency(itemsTotal, 'USD')}`;
    
    // Seção do frete
    const shipping = shippingInfo && typeof shippingInfo.value === 'number'
      ? `\nFrete: ${formatCurrency(shippingInfo.value, 'USD')}`
      : '';
    
    // Total final
    const total = `\n*Total Final: ${formatCurrency(totalPrice(), 'USD')}*`;

    // Informações de entrega com verificações de nulos
    const deliveryInfo = shippingInfo?.address
      ? '\n\n📍 *Informações de Entrega*\n' +
        `Cidade: ${shippingInfo.address.city || 'Não informada'}\n` +
        `Estado: ${shippingInfo.address.state || 'Não informado'}` +
        (shippingInfo.address.neighborhood ? `\nBairro: ${shippingInfo.address.neighborhood}` : '') +
        (shippingInfo.deadline ? `\nPrazo: ${shippingInfo.deadline}` : '')
      : '';

    // Informações de pagamento com status
    const paymentInfo = paymentMethod
      ? `\n\n💳 *Forma de Pagamento*\n${paymentMethod === 'cash' ? 'Pagamento na Entrega' : 'PIX'}` +
        `\n*Status:* ${paymentMethod === 'cash' ? '⏳ Aguardando pagamento na entrega' : '✅ Pago via PIX'}`
      : '';

    // Mensagem de agradecimento
    const footer = '\n\n✨ Obrigado pela preferência!';

    return header + items + subtotal + shipping + total + deliveryInfo + paymentInfo + footer;
  };

  const handleWhatsAppShare = () => {
    if (!shippingInfo || !paymentMethod) return;
    
    const message = encodeURIComponent(formatOrderMessage());
    const whatsappUrl = `https://wa.me/?text=${message}`;
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
