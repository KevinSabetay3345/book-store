import React from 'react';
import { useSelector } from 'react-redux';
import './ShowCart.css';
import { CartItem } from '../CartItem/CartItem';
import { useTranslation } from '../../../hooks/useTranslation';
import ReactGA from 'react-ga4';

export const ShowCart = () => {
    const cart = useSelector(state => state.cart.items);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const t = useTranslation();
    
    function checkout() {
        ReactGA.event("begin_checkout")
    }

    return (
        <div className="all-items">

            <p className="cart-title">{t("Detalles del carrito")}</p>
            
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
                    {t("TOTAL")}
                </div>
                <div className="payment-value">
                   ARS${ totalPrice }
                </div>
            </div>
            <div className="payment-button">
                <button className="payment-btn" onClick={checkout}>{t("Proceder al pago")}</button>
            </div>
        </div>
    )
}