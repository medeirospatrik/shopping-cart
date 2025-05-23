import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import AppContext from '../../context/AppContext';
import styles from './ShippingCalculator.module.css';
import formatCurrency from '../../utils/formatCurrency';

export default function ShippingCalculator() {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { shippingInfo, setShippingInfo } = useContext(AppContext);

  const formatCEP = (value) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    // Formata como CEP (00000-000)
    return numbers.replace(/^(\d{5})(\d{3}).*/, '$1-$2');
  };

  const handleCEPChange = (event) => {
    const formatted = formatCEP(event.target.value);
    setCep(formatted);
    // Limpa erro quando o usuário começa a digitar novamente
    if (error) setError('');
  };

  const validateCEP = (cep) => {
    const cleanCEP = cep.replace(/\D/g, '');
    if (cleanCEP.length !== 8) {
      setError('CEP deve ter 8 dígitos');
      return false;
    }
    return true;
  };

  const calculateShipping = async () => {
    if (!validateCEP(cep)) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError('CEP não encontrado');
        setShippingInfo(null);
        return;
      }

      // Taxa fixa de $5 USD para todas as localidades
      const fixedShippingValue = 5;
      
      // Prazo de entrega especial para Seropédica
      const isSeropedica = data.localidade.toLowerCase() === 'seropédica';
      const deadline = isSeropedica ? '1-2 dias úteis' : '5-8 dias úteis';

      setShippingInfo({
        address: {
          city: data.localidade,
          state: data.uf,
          neighborhood: data.bairro || '',
        },
        value: fixedShippingValue,
        deadline: deadline
      });
    } catch (err) {
      console.error('Erro ao calcular frete:', err);
      setError('Erro ao calcular o frete. Tente novamente.');
      setShippingInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.calculator}>
      <h3 className={styles.title}>Calcular Frete</h3>
      
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={cep}
          onChange={handleCEPChange}
          placeholder="Digite seu CEP"
          maxLength="9"
          className={styles.input}
        />
        <button
          onClick={calculateShipping}
          disabled={loading}
          className={styles.button}
        >
          {loading ? 'Calculando...' : 'Calcular'}
        </button>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.error}
        >
          {error}
        </motion.p>
      )}

      {shippingInfo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.result}
        >
          <p className={styles.address}>
            Entrega para {shippingInfo.address.city} - {shippingInfo.address.state}
            {shippingInfo.address.neighborhood && `, ${shippingInfo.address.neighborhood}`}
          </p>
          <p className={styles.shipping}>
            <span>Frete: {formatCurrency(shippingInfo.value, 'USD')}</span>
            <span>Prazo: {shippingInfo.deadline}</span>
          </p>
        </motion.div>
      )}

      <p className={styles.hint}>
        Não sabe seu CEP?{' '}
        <a
          href="https://buscacepinter.correios.com.br/app/endereco/index.php"
          target="_blank"
          rel="noopener noreferrer"
        >
          Consulte aqui
        </a>
      </p>
    </div>
  );
}
