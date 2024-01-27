import React, { useEffect, useContext} from 'react';

import './Products.css';
import fetchProducts from '../../API/fetchProducts';
import ProductCard from '../ProductCard/ProductCard';
import Loading from '../Loading/Loading';
import AppContext from '../../context/AppContext';
import fetchCep from '../../API/fetchCep';
import { getItemLocalStorage} from '../../utils/setLocalStorage';

export default function Products() {

  const { products, setProducts, loading, setLoading, setCartItems} = useContext(AppContext);
  
  
  useEffect(() => {

    fetchProducts('iphone').then((response) => {
      setProducts(response);
      setLoading(false);
    });

    fetchCep('23898093').then((response) => {
      console.log(response);
    });

    setCartItems(getItemLocalStorage('cart'));
  }, []);

  return (
    (loading ? <Loading /> : <section className=" products container">
      {products.map((product) => <ProductCard key={product.id} data={product} />)}
    </section>)
    
  );
}
