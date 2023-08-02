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
        return <main className="error">Error: {error.message}</main>;
    } else if (!isLoaded) {
        return <main className="loader"></main>;
    } else {
        if (books.length > 0){
            return (
            <main className="grid-books">
                {books.map(book => (
                    <ShowBook book={book} key={book.id} />
                ))}
            </main>
            );
        }
        return (
            <main className="error">
                {t("No se encontraron libros. Ingrese otro término de busqueda.")}
            </main>
        );
    }

}