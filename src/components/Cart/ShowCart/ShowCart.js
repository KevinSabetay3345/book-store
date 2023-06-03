import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './ShowCart.css';
import { CartItem } from '../CartItem/CartItem';


export const ShowCart = () => {
    const cart = useSelector(state => state.cart.items);
    const [totalPrice, setTotalPrice] = useState("0.00")

    useEffect(() => {
        if (cart.length > 0) {
            const priceXquantity = (item) => (item.quantity * item.price);
            const sumPrice = (cont, item) => cont + item;
            setTotalPrice(cart.map(priceXquantity).reduce(sumPrice, 0).toFixed(2));
        } else {
            setTotalPrice("0.00");
        }
    }, [cart])
    
    return (
        <div className="all-items">

            <p className="cart-title">Detalles del carrito</p>
            
            { /* Grid with all cart's elements */ }
           
            { (cart.length > 0) ?
            <div className="list-width">
                { cart.map( item => {
                return (
                    <React.Fragment key={item.id}>
                        <div className="divider"></div>
                        <CartItem item={item} /> 
                    </React.Fragment>
                ) } ) }
            </div>
            : ""}

            <div className="divider"></div>

            {/* Payment section */}
            <div className="payment-grid">
                <div className="payment-title">
                    TOTAL
                </div>
                <div className="payment-value">
                   ARS${ totalPrice }
                </div>
            </div>
            <div className="payment-button">
                <button className="payment-btn">Proceder al pago</button>
            </div>
        </div>
    )
}