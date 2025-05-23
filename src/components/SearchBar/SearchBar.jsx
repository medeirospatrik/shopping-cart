import  { useContext, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { motion } from 'framer-motion';
import AppContext from '../../context/AppContext';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const { loadProducts } = useContext(AppContext);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchValue.trim()) return;

    try {
      await loadProducts(searchValue);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setSearchValue('');
    }
  };

  return (
    <form 
      className="relative"
      onSubmit={handleSearch}
    >
      <div className="relative">
        <input
          value={searchValue}
          type="search"
          placeholder="Buscar produtos"
          className="w-full py-2 pl-4 pr-14 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all duration-200"
          onChange={({ target }) => setSearchValue(target.value)}
          required
        />
        <motion.button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-primary transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <BsSearch />
        </motion.button>
      </div>
    </form>
  );
}
