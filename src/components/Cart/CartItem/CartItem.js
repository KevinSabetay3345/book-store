import React from 'react';
import './CartItem.css';
import { changeQuantity, removeItem } from '../../../actions/CartActions';
import { useDispatch } from 'react-redux';

export const CartItem = ( { item } ) => {

        const dispatch = useDispatch();
        const imgLink = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : "";
        const title = item.volumeInfo.title;
        const authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : "";
        const price = item.saleInfo.retailPrice.amount;
        const quantity = item.quantity;

        return(
            <div className="item-grid">

                <div className="item-img">
                    <img 
                    srcSet={imgLink} 
                    src="https://www.bodi-tek.co.uk/images/product_image_not_found_thumb.gif"
                    alt={title}
                    />
                </div>

                <div className="item-detail">
                
                    <div className="item-description">
                        <p className="item-title">{ title }</p>
                        <p className="item-authors">{ authors.length > 100 ? (authors.substring(0, 100) + "...") : authors }</p>
                        <p className="item-price">ARS${ price }</p>
                    </div>
                </div>

                <div className="item-actions">
                    <div className="item-quantity">
                        <p className="quantity-text">Cantidad: </p>
                        <select className="quantity-select" value={quantity} onChange={ (e) => dispatch( changeQuantity(item.id, e.target.value) ) }>
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
                        <p>ARS${ (price*quantity).toFixed(2) }</p>
                    </div>
                    <button className={ "item-delete" } onClick={ () => dispatch( removeItem(item.id) ) }>
                        Eliminar
                    </button>                            
                </div>

            </div>
        )
}