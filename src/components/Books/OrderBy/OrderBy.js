import React, { useEffect, useRef } from 'react';
import './OrderBy.css';
import { useSelector, useDispatch } from 'react-redux';
import { orderBooks } from '../../../slices/bookSlice';
import { useTranslation } from '../../../hooks/useTranslation';
import ReactGA from 'react-ga4';

export const OrderBy = () => {
    const dispatch = useDispatch();
    const isLoaded = useSelector(state => state.books.isLoaded);
    const orderByRef = useRef("default");
    const t = useTranslation();
  
    /* Every new search order-by should empty */
    useEffect( () => {
        if (!isLoaded) {
            orderByRef.current.value = "default";
        }
    }, [isLoaded])

    function changeOrder(e) {
        dispatch( orderBooks(e.target.value) )
        ReactGA.event("order_books", { order: e.target.value })
    }

    return (
        <div className="order-by">
            <select ref={orderByRef} onChange={ changeOrder }>
                <option value="default">{t("Ordenar")}</option>
                <option value="LOW_PRICE">{t("Precio menor a mayor")}</option>
                <option value="HIGH_PRICE">{t("Precio mayor a menor")}</option>
                <option value="OLD">{t("Más antiguos")}</option>
                <option value="NEW">{t("Más recientes")}</option>
            </select>
        </div>
    )
}