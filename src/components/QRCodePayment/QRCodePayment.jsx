import { useContext, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import AppContext from '../../context/AppContext';
import formatCurrency from '../../utils/formatCurrency';
import styles from './QRCodePayment.module.css';

export default function QRCodePayment() {
  const { 
    cartItems, 
    shippingInfo, 
    paymentMethod,
    paymentConfirmed
  } = useContext(AppContext);
  
  const [verificationRequested, setVerificationRequested] = useState(false);
  
  const PIX_KEY = 'medeirospatrik2@gmail.com';
  const SELLER_PHONE = '5511969009930'; // Número do vendedor no formato internacional

  const totalPrice = () => {
    const itemsTotal = cartItems.reduce((acc, item) => item.price * (item.quantity || 1) + acc, 0);
    const shippingCost = shippingInfo && typeof shippingInfo.value === 'number' ? shippingInfo.value : 0;
    return itemsTotal + shippingCost;
  };

  const crc16ccitt = (str) => {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
      let c = str.charCodeAt(i);
      c = ((c << 8) & 0xFF00);
      for (let j = 0; j < 8; j++) {
        if ((crc ^ c) & 0x8000) {
          crc = (crc << 1) ^ 0x1021;
        } else {
          crc = crc << 1;
        }
        c = c << 1;
      }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  };

  const generatePixPayload = () => {
    try {
      const merchantName = 'PATRIK MEDEIROS';
      const merchantCity = 'SAO PAULO';
      const total = totalPrice();
      const txid = 'SHOPCART' + Date.now().toString();

      let payload = '000201';
      
      payload += '26';
      payload += '43';
      payload += '0014br.gov.bcb.pix';
      payload += '01' + PIX_KEY.length + PIX_KEY;

      payload += '52040000';
      
      payload += '5303986';
      
      payload += '54' + ('0' + total.toFixed(2).length) + total.toFixed(2);
      
      payload += '5802BR';
      
      payload += '59' + merchantName.length + merchantName;
      
      payload += '60' + merchantCity.length + merchantCity;
      
      payload += '62' + ('0' + (txid.length + 4)).padStart(2, '0') + '05' + txid.length + txid;
      
      payload += '6304';
      const crc = crc16ccitt(payload);
      payload += crc;

      return payload;
    } catch (error) {
      console.error('Erro ao gerar payload PIX:', error);
      return '';
    }
  };

  const handleVerificationRequest = () => {
    const total = formatCurrency(totalPrice(), 'USD');
    const customerAddress = `${shippingInfo.street}, ${shippingInfo.number} - ${shippingInfo.neighborhood}, ${shippingInfo.city}/${shippingInfo.state}`;
    const orderId = Date.now().toString(); // Gera um ID único para o pedido
    
    const confirmationLink = `${window.location.origin}/seller-confirmation/${orderId}`;
    
    const message = encodeURIComponent(
      '🔔 *Nova solicitação de verificação de pagamento PIX*\n\n' +
      '📦 Pedido:\n' +
      cartItems.map(item => `- ${item.quantity}x ${item.title}`).join('\n') + '\n\n' +
      '💰 Valor Total: ' + total + '\n' +
      '📍 Endereço: ' + customerAddress + '\n\n' +
      '✅ Para confirmar o pagamento, acesse:\n' +
      confirmationLink + '\n\n' +
      '⚠️ Não confirme sem verificar o recebimento do PIX!'
    );

    setVerificationRequested(true);
    window.open(`https://wa.me/${SELLER_PHONE}?text=${message}`, '_blank');
    
    // Salva os dados do pedido no localStorage
    localStorage.setItem(`order_${orderId}`, JSON.stringify({
      items: cartItems,
      total: totalPrice(),
      address: customerAddress,
      status: 'pending'
    }));
  };

  if (paymentMethod !== 'qrcode') return null;

  if (!shippingInfo) {
    return (
      <motion.div
        className={styles.qrCodeContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <h3 className={styles.title}>QR Code PIX</h3>
        <p className={styles.warning}>
          Por favor, calcule o frete primeiro preenchendo seu CEP para gerar o QR Code PIX
        </p>
      </motion.div>
    );
  }

  const pixPayload = generatePixPayload();

  return (
    <AnimatePresence>
      <motion.div
        className={styles.qrCodeContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <h3 className={styles.title}>QR Code PIX</h3>
        <div className={styles.qrWrapper}>
          {pixPayload ? (
            <>
              <QRCodeSVG
                value={pixPayload}
                size={200}
                level='H'
                includeMargin
                className={styles.qrCode}
              />
              {!paymentConfirmed && !verificationRequested && (
                <motion.button
                  type='button'
                  className={styles.confirmButton}
                  onClick={handleVerificationRequest}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Solicitar Confirmação de Pagamento
                </motion.button>
              )}
              {verificationRequested && !paymentConfirmed && (
                <p className={styles.verificationMessage}>
                  ⏳ Solicitação enviada! Aguardando confirmação do vendedor...
                </p>
              )}
              {paymentConfirmed && (
                <p className={styles.confirmedMessage}>
                  ✅ Pagamento PIX confirmado!
                </p>
              )}
            </>
          ) : (
            <p className={styles.error}>Erro ao gerar QR Code</p>
          )}
        </div>
        <p className={styles.amount}>
          Valor Total: {formatCurrency(totalPrice(), 'USD')}
        </p>
        <div className={styles.pixInfo}>
          <p className={styles.pixKey}>
            <strong>Chave PIX:</strong> {PIX_KEY}
          </p>
          <button
            type='button'
            className={styles.copyButton}
            onClick={() => {
              navigator.clipboard.writeText(PIX_KEY);
              const button = document.activeElement;
              const originalText = button.textContent;
              button.textContent = 'Copiado!';
              setTimeout(() => {
                button.textContent = originalText;
              }, 2000);
            }}
          >
            Copiar Chave
          </button>
        </div>
        <p className={styles.instructions}>
          {paymentConfirmed 
            ? 'Você já pode finalizar seu pedido!'
            : verificationRequested
              ? 'O vendedor foi notificado e irá verificar seu pagamento em breve.'
              : 'Escaneie o QR Code ou copie a chave PIX para realizar o pagamento. Após pagar, clique em "Solicitar Confirmação" para notificar o vendedor.'}
        </p>
      </motion.div>
    </AnimatePresence>
  );
} 