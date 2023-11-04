import React from 'react';
import './CartItem.css';
import { changeQuantity, removeItem } from '../../../slices/cartSlice';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from '../../../hooks/useTranslation'

export const CartItem = ( { item } ) => {
    const dispatch = useDispatch();
    const t = useTranslation();
    
    return(
        <div className="item-grid" data-test="cart-item">

            <div className="item-img">
                <img 
                // changing http to https
                srcSet={item.imgLink}
                src="https://www.bodi-tek.co.uk/images/product_image_not_found_thumb.gif"
                alt={item.title}
                />
            </div>

            <div className="item-detail">
                <div className="item-description">
                    <p className="item-title">{ item.title }</p>
                    <p className="item-authors">{ item.authors.length > 100 ? (item.authors.substring(0, 100) + "...") : item.authors }</p>
                    <p className="item-price">ARS${ item.price }</p>
                </div>
            </div>

            <div className="item-actions">
                <div className="item-quantity">
                    <p className="quantity-text">{t("Cantidad")}: </p>
                    <select className="quantity-select" value={item.quantity} onChange={ (e) => dispatch( changeQuantity( {id: item.id, quantity: e.target.value } ) ) }>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div className="sum-price">
                    <p>ARS${ (item.price*item.quantity).toFixed(2) }</p>
                </div>
                <button data-test="delete-item" className="item-delete" onClick={ () => dispatch( removeItem(item.id) ) }>
                    {t("Eliminar")}
                </button>                            
            </div>

        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        imgLink: PropTypes.string,
        authors: PropTypes.string,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.string.isRequired
      })
}