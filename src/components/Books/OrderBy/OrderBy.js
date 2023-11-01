import React, { useEffect, useState } from 'react';
import './OrderBy.css';
import { useDispatch } from 'react-redux';
import { orderBooks } from '../../../slices/bookSlice';
import { useTranslation } from '../../../hooks/useTranslation';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

export const OrderBy = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const [orderBy, setOrderBy] = useState("default")
    const t = useTranslation()
  
    /* Every new search order-by should empty */
    useEffect(() => {
        setOrderBy("default")
    }, [location])

    function changeOrder(e) {
        setOrderBy(e.target.value)
        dispatch( orderBooks(e.target.value) )
        ReactGA.event("order_books", { order: e.target.value })
    }

    return (
        <div className="order-by">
            <select data-test="order-by" value={orderBy} onChange={ changeOrder }>
                <option value="default">{t("Ordenar")}</option>
                <option value="LOW_PRICE">{t("Precio menor a mayor")}</option>
                <option value="HIGH_PRICE">{t("Precio mayor a menor")}</option>
                <option value="OLD">{t("Más antiguos")}</option>
                <option value="NEW">{t("Más recientes")}</option>
            </select>
        </div>
    )
}