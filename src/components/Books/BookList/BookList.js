import React from 'react';
import { ShowBook } from '../ShowBook/ShowBook';
import './BookList.css';
import { useSelector } from 'react-redux';

export function BookList(){
    const error = useSelector(state => state.books.error);
    const isLoaded = useSelector(state => state.books.isLoaded);
    const books = useSelector(state => state.books.bookList);

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
                No se encontraron libros. Ingrese otro término de busqueda.
            </div>
        );
    }

}