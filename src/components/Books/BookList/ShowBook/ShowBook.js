import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './ShowBook.css';
import { BookCover } from './BookCover/BookCover';
import { BookModal } from './BookModal/BookModal';
import PropTypes from 'prop-types';

export function ShowBook ( { book } ) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <BookCover openModal={() => setShowModal(true)} book={book} />

            {showModal && createPortal(
                <BookModal
                    book={book} 
                    handleClose={() => setShowModal(false)}
                />,
                document.body
            )}
        </>
    );
}

ShowBook.propTypes = {
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