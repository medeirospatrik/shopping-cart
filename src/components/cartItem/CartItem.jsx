import React, { useContext } from 'react';
import propTypes from 'prop-types';

import { BsCartDashFill } from 'react-icons/bs';
import './CartItem.css';
import formatCurrency from '../../utils/formatCurrency';
import AppContext from '../../context/AppContext';
import { setItemLocalStorage } from '../../utils/setLocalStorage';


export default function CartItem({ data }) {

  const {cartItems, setCartItems} = useContext(AppContext);

  const { id ,price, title, thumbnail} = data; 

  const handleRemoveItem = () => {
    // Encontra o índice do item no array
    const index = cartItems.findIndex((item) => item.id === id);

    // Se o índice for encontrado, remova o item
    if (index !== -1) {
      const updatedItems = [...cartItems];
      updatedItems.splice(index, 1);
      setCartItems(updatedItems);
      setItemLocalStorage('cart', updatedItems);
    }
  };

  return (
    <section className="cart-item">
      <img
        src={thumbnail}
        alt="imagem do produto"
        className="cart-item-image"
      />

      <div className="cart-item-content">
        <h3 className="cart-item-title">{title}</h3>
        <h3 className="cart-item-price">{formatCurrency(price)}</h3>

        <button
          type="button"
          className="button__remove-item"
          onClick={ handleRemoveItem }
        >
          <BsCartDashFill />
        </button>
      </div>

    </section>
  );
}

CartItem.propTypes = {
  data: propTypes.shape({})
}.isRequired;
