import React, { useEffect } from 'react';
import { ShowBook } from './ShowBook/ShowBook';
import { fetchBooks } from '../../../slices/bookSlice';
import './BookList.css';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from '../../../hooks/useTranslation';
import { useParams } from 'react-router-dom';

export function BookList(){
    const error = useSelector(state => state.books.error);
    const isLoaded = useSelector(state => state.books.isLoaded);
    const books = useSelector(state => state.books.bookList);
    const dispatch = useDispatch();
    const param = useParams();
    const t = useTranslation();
  
    //Default search
    useEffect(() => {
        if (param.search) dispatch( fetchBooks(param.search) )
    }, [param])

    if (error.message !== undefined) {
        return <div className="error">Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="loader"></div>;
    } else {
        if (books.length > 0){
            return (
            <div className="grid-books">
                {books.map(book => (
                    <ShowBook book={book} key={book.id} />
                ))}
            </div>
            );
        }
        return (
            <div className="error">
                {t("No se encontraron libros. Ingrese otro término de busqueda.")}
            </div>
        );
    }

}