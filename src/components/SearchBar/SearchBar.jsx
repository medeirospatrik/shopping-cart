import React, { useContext, useState } from 'react';
import { BsSearch } from 'react-icons/bs';

import './SearchBar.css';
import fetchProducts from '../../API/fetchProducts';
import AppContext from '../../context/AppContext';

export default function SearchBar() {

  const [searchValue, setSearchValue] = useState('');

  const {setProducts, setLoading} = useContext(AppContext);

  const { name } = useContext(AppContext);

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    const products = await fetchProducts(searchValue);

    setProducts(products);
    setLoading(false);
    setSearchValue('');
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      {name}
      <input
        value={searchValue}
        type="search"
        placeholder="Buscar produtos"
        className="search__input"
        onChange={({ target }) => setSearchValue(target.value)}
        required
      />
      <button type="submit" className="search__button">
        <BsSearch/>
      </button>

    </form>
  );
}
