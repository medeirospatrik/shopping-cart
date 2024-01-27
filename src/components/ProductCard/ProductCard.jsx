import React, { useContext } from 'react';
import propTypes from 'prop-types';

import './ProductCard.css';
import { BsFillCartPlusFill } from 'react-icons/bs';
import formatCurrency from '../../utils/formatCurrency';
import AppContext from '../../context/AppContext';


export default function ProductCard({ data }) {

  const {
    price,
    title,
    thumbnail,
    currency_id
  } = data;

  const {cartItems, setCartItems} = useContext(AppContext);

  const handleCart = () => setCartItems([ ...cartItems, data]);
  

  return (
    <section className="product-card">
      <img
        src={thumbnail.replace(/\w\.jpg/gi, 'W.jpg')}
        alt="product"
        className="card__image"
      />
      <div className="card__infos">
        <h2 className="card__price">{formatCurrency(price, currency_id)}</h2>
        <h2 className="card__title">{title}</h2>
        <button
          type="button"
          className="button__add-cart"
          onClick={ handleCart }
        >
          <BsFillCartPlusFill/>
        </button>
      </div>
    </section>
  );
}

ProductCard.propTypes = {
  data: propTypes.shape({})
}.isRequired;
