
const fetchCep = async (query) => {
  const result = await fetch(`https://brasilapi.com.br/api/cep/v1/${query}`);
  const data = await result.json();
  return data;
};


export default fetchCep;
