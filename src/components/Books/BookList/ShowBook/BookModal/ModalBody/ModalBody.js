import React from 'react';
import './ModalBody.css';
import { BodyDescription } from './BodyDescription/BodyDescription';
import PropTypes from 'prop-types';

export const ModalBody = ( { book } ) => {

    return (
        <div className="book-information">
            
            <section className="basic-detail">
              <div className="book-img">
                <img 
                srcSet={book.imgLink}
                alt={book.title}
                src="https://linnea.com.ar/wp-content/uploads/2018/09/404PosterNotFoundReverse.jpg"
                />
              </div>
              
              <div className="short-details">
                <p id="title"> { book.title } </p>
                <p id="authors"> { book.authors } </p>
                <p id="publishedDate" style={ (typeof book.publishedDate === 'undefined') ? {display:'none'} : {} }> Fecha de publicación: { book.publishedDate } </p>
                <p id="pageCount" style={ (typeof book.pageCount === 'undefined') ? {display:'none'} : {} }> Número de páginas: { book.pageCount } </p>
              </div>
            </section>
            
            <section className="book-description">
              <BodyDescription description={book.description} />
            </section>
        
        </div>
    )
}

ModalBody.propTypes = {
  book: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      imgLink: PropTypes.string,
      authors: PropTypes.string,
      publishedDate: PropTypes.string,
      description: PropTypes.string,
      pageCount: PropTypes.number,
      saleability: PropTypes.string,
      price: PropTypes.number,
      webReaderLink: PropTypes.string
    })
}