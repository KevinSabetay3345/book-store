import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './ShowBook.css';
import { BookCover } from './BookCover/BookCover';
import { BookModal } from './BookModal/BookModal';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export function ShowBook ( { book } ) {
    const [showModal, setShowModal] = useState(false);
    const [beforeClose, setBeforeClose] = useState(false);
    const isLoaded = useSelector(state => state.books.isLoaded)
    
    useEffect( () =>{
        const timer = setTimeout(() => {
            setBeforeClose(false);
            setShowModal(false);
        }, 400);
        return () => clearTimeout(timer);
    }, [beforeClose]);

    if (isLoaded){
        return (
            <>
                <BookCover showModal={setShowModal} book={book} />

                <Modal
                    isOpen={showModal}
                    onRequestClose={() => setBeforeClose(true)}
                    className={ beforeClose ? "modal-description modal-dissapear" : "modal-description" }
                    overlayClassName={ beforeClose ? "overlay overlay-fade-out" : "overlay" }
                    ariaHideApp={false}
                >
                    <BookModal
                        book={book} 
                        handleClose={() => setBeforeClose(true)}
                    />
                </Modal>
            </>
        );
    }else{
        return <></>;
    }
    
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