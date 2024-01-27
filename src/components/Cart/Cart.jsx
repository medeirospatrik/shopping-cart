import React, { useContext } from 'react';

import './Cart.css';
import CartItem from '../cartItem/CartItem';
import AppContext from '../../context/AppContext';
import formatCurrency from '../../utils/formatCurrency';

export default function Cart() {

  const {cartItems, isCartVisible} = useContext(AppContext);

  const totalPrice = () => cartItems.reduce((acc, item) => item.price + acc, 0);
  

  return (
    <section className={`cart ${isCartVisible ? 'cart--active' : ''}`}>
      <div className="cart-items">
        {cartItems.map((item) => <CartItem key={ item.id } data={ item }/>)}
      </div>
      <div className="cart-resume">
        {formatCurrency(totalPrice())}
      </div>
    </section>
  );
}
