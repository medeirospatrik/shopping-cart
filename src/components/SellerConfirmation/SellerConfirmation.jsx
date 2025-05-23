import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './SellerConfirmation.module.css';

export default function SellerConfirmation() {
  const { orderId } = useParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleConfirmation = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Aqui você implementaria a chamada real para sua API
      // Por enquanto, vamos simular com um timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (password !== 'senha123') { // Em produção, use uma senha segura e hash
        throw new Error('Senha incorreta');
      }

      // Aqui você atualizaria o status do pedido no seu backend
      localStorage.setItem(`order_${orderId}_confirmed`, 'true');
      
      navigate('/confirmacao-sucesso');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Confirmação de Pagamento</h1>
      <p className={styles.orderId}>Pedido #{orderId}</p>
      
      {error && <p className={styles.error}>{error}</p>}
      
      <form onSubmit={handleConfirmation} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha do Vendedor:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className={styles.confirmButton}
          disabled={loading}
        >
          {loading ? 'Confirmando...' : 'Confirmar Pagamento'}
        </button>
      </form>
    </div>
  );
} 