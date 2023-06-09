import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './CartMenu.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from '../../../hooks/useTranslation';

export function CartMenu() {
  const cart = useSelector(state => state.cart.items);
  const totalPrice = useSelector(state => state.cart.totalPrice);
  const t = useTranslation();

    return (
          <div className="link-container">
            <Link to="/cart" className="app-cart">
                  <div className="cart-text">
                        <span className="cart-quantity">{cart.length}</span> {t("Productos")} | AR$
                        <span className="cart-price">{ totalPrice }</span>
                  </div>                
                  <ShoppingCartOutlined className="cart-icon" />
            </Link>
          </div>
    )
}