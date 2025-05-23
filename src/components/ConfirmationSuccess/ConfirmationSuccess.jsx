import { useNavigate } from 'react-router-dom';
import styles from './ConfirmationSuccess.module.css';

export default function ConfirmationSuccess() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>✅</div>
        <h1 className={styles.title}>Pagamento Confirmado!</h1>
        <p className={styles.message}>
          O pagamento foi confirmado com sucesso. O cliente será notificado automaticamente.
        </p>
        <button 
          className={styles.button}
          onClick={() => navigate('/')}
        >
          Voltar para a Loja
        </button>
      </div>
    </div>
  );
} 