import React from 'react';
import './BookModal.css';
import { CloseOutlined } from '@ant-design/icons';
import { ModalBody } from './ModalBody/ModalBody';
import { ModalFooter } from './ModalFooter/ModalFooter';
import PropTypes from 'prop-types';

export const BookModal = ( { book, handleClose } ) => {
    
  return (
    <div className="modal-main" data-test="book-modal">
          
          <header className="modal-header">
            <button data-test="close-modal" className="close-modal" type="button" onClick={handleClose}>
              <CloseOutlined />
            </button>
          </header>

          <ModalBody book={book} />
          
          <footer>
            <ModalFooter book={book}/>
          </footer>

        </div>
    );
};

BookModal.propTypes = {
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
  handleClose: PropTypes.func
}
