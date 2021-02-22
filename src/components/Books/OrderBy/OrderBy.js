import React, { useEffect, useRef } from 'react';
import './OrderBy.css';
import { useSelector, useDispatch } from 'react-redux';
import { orderBooks } from '../../../actions/BookActions';

export const OrderBy = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.books.bookList);
    const isLoaded = useSelector(state => state.books.isLoaded);
    const orderByRef = useRef("default");
  
    /* Every new search order-by should empty */
    useEffect( () => {
        if (!isLoaded) {
            orderByRef.current.value = "default";
        }
    }, [isLoaded])

    return (
        <div className="order-by">
            <select ref={orderByRef} onChange={ (e) => dispatch( orderBooks(books, e.target.value) ) }>
                <option value="default">Ordenar</option>
                <option value="LOW_PRICE">Precio menor a mayor</option>
                <option value="HIGH_PRICE">Precio mayor a menor</option>
                <option value="OLD">Más antiguos</option>
                <option value="NEW">Más recientes</option>
            </select>
        </div>
    )
}