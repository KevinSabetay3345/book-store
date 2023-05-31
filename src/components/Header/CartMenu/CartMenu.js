import React, { useState, useEffect } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './CartMenu.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function CartMenu() {
  const cart = useSelector(state => state.cart.items);
  const [totalPrice, setTotalPrice] = useState("0.00")
    
  useEffect(() => {
      if (cart.length > 0) {
          const priceXquantity = (item) => (item.quantity * item.price);
          const sumPrice = (cont, item) => cont + item;
          setTotalPrice(cart.map(priceXquantity).reduce(sumPrice, 0).toFixed(2));
      }
  }, [cart])

    return (
          <div className="link-container">
            <Link to="/cart" className="app-cart">
                  <div className="cart-text">
                        <span className="cart-quantity">{cart.length}</span> Productos | AR$
                        <span className="cart-price">{ totalPrice }</span>
                  </div>                
                  <ShoppingCartOutlined className="cart-icon" />
            </Link>
          </div>
    )
}