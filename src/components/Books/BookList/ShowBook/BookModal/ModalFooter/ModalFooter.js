import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem  } from '../../../../../../actions/CartActions';
import { ShoppingCartOutlined, ReadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './ModalFooter.css';


export const ModalFooter = ( { book } ) => {
    const [ existsInCart, setExistsInCart ] = useState(false);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
  
    useEffect(() => {
      const exists = cart.filter(cartItem => cartItem.id === book.id).length  > 0;
      setExistsInCart(exists);
    }, [cart, book]);
    
    if (book.saleInfo.saleability === "FOR_SALE") {
      return (
          <div className="footer-content">
            { existsInCart && <Link to="/cart" className="go-to-cart"><ShoppingCartOutlined/></Link> }
            
            <div className="action-btn-container">
              { existsInCart && <div className="show-success">Libro añadido al carrito</div> }
            
              <button 
                className={ existsInCart ? "action-btn fade-out" : "action-btn" } 
                onClick={ () => dispatch( addItem(book) ) }
                disabled={ existsInCart ? "disabled" : "" }
              >
                <p> AR${ book.saleInfo.retailPrice.amount }</p> <span className="icon"><ShoppingCartOutlined/></span>
              </button>
            </div>
          </div>
      );
    }
    if (book.saleInfo.saleability === "FREE"){
      return (
        <div className="footer-content">
            <button className="action-btn">
              <a href= { book.accessInfo.webReaderLink } target="_blank" rel="noopener noreferrer">Leer online </a>
              <span className="icon" id="read-icon"><ReadOutlined /></span>
            </button>
        </div>
      );
    }
    return (
        <div className="footer-content">
          <div className="not-for-sale">
            No esta a la venta
          </div>
        </div>
    );
}