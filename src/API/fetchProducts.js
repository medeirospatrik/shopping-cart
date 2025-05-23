const fetchProducts = async (query = '') => {
  try {
    console.log('Fetching products...');
    const baseUrl = 'https://dummyjson.com/products';
    const url = query 
      ? `${baseUrl}/search?q=${encodeURIComponent(query)}`
      : baseUrl;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('Response status:', response.status);
      console.error('Response status text:', response.statusText);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export default fetchProducts;
