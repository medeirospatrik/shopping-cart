import { useState } from 'react';

export function useShipping() {
  const [shippingInfo, setShippingInfo] = useState(null);

  const calculateShipping = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
      const data = await response.json();

      if (data.erro) {
        throw new Error('CEP não encontrado');
      }

      // Taxa fixa de $5 USD para todas as localidades
      const shippingValue = 5;

      setShippingInfo({
        address: {
          city: data.localidade,
          state: data.uf,
          neighborhood: data.bairro || '',
        },
        value: shippingValue,
        deadline: data.localidade.toLowerCase() === 'seropédica' ? '1-2 dias úteis' : '5-8 dias úteis'
      });

      return true;
    } catch (error) {
      console.error('Erro ao calcular frete:', error);
      setShippingInfo(null);
      throw error;
    }
  };

  return {
    shippingInfo,
    setShippingInfo,
    calculateShipping
  };
} 