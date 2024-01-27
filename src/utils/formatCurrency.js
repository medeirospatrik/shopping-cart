const formatCurrency = (value, currency = 'BRL') => {
  return value.toLocaleString('pr-br', {
    style: 'currency',
    currency,
  });
};

export default formatCurrency;
