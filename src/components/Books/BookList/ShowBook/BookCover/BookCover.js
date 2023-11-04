import React, { useState } from 'react';
import './BookCover.css';
import { ShoppingCartOutlined, ReadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga4';

export const BookCover = ( { book, openModal } ) => {
    const [visible, setVisible] = useState(false);

    function handleOpenModal() {
        openModal()
        ReactGA.event("view_item", {
            title: book.title,
            price: book.price
        });
    }

    return (
        <div data-test="book-cover" className="book-cover" onClick={handleOpenModal}>
            
            <div className="img">
                <img 
                // changing http to https
                srcSet={book.imgLink}
                src={"https://linnea.com.ar/wp-content/uploads/2018/09/404PosterNotFoundReverse.jpg"}
                alt={book.title}
                onLoad={ () => setVisible(true) }
                />
            </div>

            { /* shows when hover, "visible" assures to show the image first */ }
            { visible &&
            <div className="img-hover-details">
                { book.saleability === "FOR_SALE" && 
                <span className="saleability"><ShoppingCartOutlined /></span>}
                { book.saleability === "FREE" && 
                <span className="saleability"><ReadOutlined /></span>}
                
                <p className="title">{ book.title.length > 35 ? book.title.substring(0, 35) + "..." : book.title }</p>
                <p className="subtitle">{ book.authors.length > 40 ? book.authors.substring(0,40) + "..." : book.authors}</p>
            </div>
            }
            
        </div>
    )
}

BookCover.propTypes = {
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
      }),
    showModal: PropTypes.func
}