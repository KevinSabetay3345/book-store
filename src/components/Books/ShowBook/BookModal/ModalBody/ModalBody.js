import React from 'react';
import './ModalBody.css';
import { BodyDescription } from './BodyDescription/BodyDescription';

export const ModalBody = ( { book } ) => {

    const imgLink = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "";
    const title = book.volumeInfo.title;
    const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : "";
    const description = book.volumeInfo.description;
    const pageCount = book.volumeInfo.pageCount;
    const publishedDate = book.volumeInfo.publishedDate;


    return (
        <div className="book-information">
            
            <section className="basic-detail">
              <div className="book-img">
                <img 
                srcSet={imgLink}
                alt={title}
                src="https://linnea.com.ar/wp-content/uploads/2018/09/404PosterNotFoundReverse.jpg"
                />
              </div>
              
              <div className="short-details">
                <p id="title"> { title } </p>
                <p id="authors"> { authors } </p>
                <p id="publishedDate" style={ (typeof publishedDate === 'undefined') ? {display:'none'} : {} }> Fecha de publicación: { publishedDate } </p>
                <p id="pageCount" style={ (typeof pageCount === 'undefined') ? {display:'none'} : {} }> Número de páginas: { pageCount } </p>
              </div>
            </section>
            
            <section className="book-description">
              <BodyDescription description={description} />
            </section>
        
        </div>
    )
}