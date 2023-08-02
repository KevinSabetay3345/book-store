import React from 'react';
import './ModalBody.css';
import { BodyDescription } from './BodyDescription/BodyDescription';
import PropTypes from 'prop-types';
import { useTranslation } from '../../../../../../hooks/useTranslation';

export const ModalBody = ( { book } ) => {
    const t = useTranslation();

    return (
        <div className="book-information">
            
            <section className="basic-detail">
              <div className="book-img">
                <img
                // changing http to https
                srcSet={book.imgLink}
                alt={book.title}
                src="https://linnea.com.ar/wp-content/uploads/2018/09/404PosterNotFoundReverse.jpg"
                />
              </div>
              
              <div className="short-details">
                <p id="title"> { book.title } </p>
                <p id="authors"> { book.authors } </p>
                <p id="publishedDate" style={ (book.publishedDate === "") ? {display:'none'} : {} }> {t("Fecha de publicación")}: { book.publishedDate } </p>
                <p id="pageCount" style={ (book.pageCount === 0) ? {display:'none'} : {} }> {t("Número de páginas")}: { book.pageCount } </p>
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