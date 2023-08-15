import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem  } from '../../../../../../slices/cartSlice';
import { ShoppingCartOutlined, ReadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './ModalFooter.css';
import PropTypes from 'prop-types';
import { useTranslation } from '../../../../../../hooks/useTranslation';
import ReactGA from 'react-ga4';

export const ModalFooter = ( { book } ) => {
    const [ existsInCart, setExistsInCart ] = useState(false);
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const t = useTranslation();
  
    useEffect(() => {
      const exists = cart.filter(cartItem => cartItem.id === book.id).length  > 0;
      setExistsInCart(exists);
    }, [cart, book]);

    function addItemToCart(book) {
      dispatch( addItem(book) )
      ReactGA.event("add_to_cart", {
        title: book.title,
        price: book.price
      })
    }
    
    if (book.saleability === "FOR_SALE") {
      return (
          <div className="footer-content">
            { existsInCart && <Link to="/cart" className="go-to-cart"><ShoppingCartOutlined/></Link> }
            
            <div className="action-btn-container">
              { existsInCart && <div className="show-success">{t("Libro añadido al carrito")}</div> }
            
              <button 
                className={ existsInCart ? "action-btn fade-out" : "action-btn" } 
                onClick={ () => addItemToCart(book) }
                disabled={ existsInCart ? "disabled" : "" }
              >
                <p> AR${ book.price }</p> <span className="icon"><ShoppingCartOutlined/></span>
              </button>
            </div>
          </div>
      );
    }
    if (book.saleability === "FREE"){
      return (
        <div className="footer-content">
            <button className="action-btn">
              <a href= { book.webReaderLink } target="_blank" rel="noopener noreferrer">{t("Leer online")} </a>
              <span className="icon" id="read-icon"><ReadOutlined /></span>
            </button>
        </div>
      );
    }
    return (
        <div className="footer-content">
          <div className="not-for-sale">
            {t("No esta a la venta")}
          </div>
        </div>
    );
}

ModalFooter.propTypes = {
  book: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      imgLink: PropTypes.string,
      authors: PropTypes.string,
      publishedDate: PropTypes.string,
      description: PropTypes.string,
      pageCount: PropTypes.number,
      saleability: PropTypes.string,
      price: PropTypes.number,
      webReaderLink: PropTypes.string
    })
}