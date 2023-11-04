import React, { useEffect, useState } from 'react';
import './BookModal.css';
import { CloseOutlined } from '@ant-design/icons';
import { ModalBody } from './ModalBody/ModalBody';
import { ModalFooter } from './ModalFooter/ModalFooter';
import PropTypes from 'prop-types';

export const BookModal = ( { book, handleClose } ) => {
  const [beforeClose, setBeforeClose] = useState(false);

  useEffect( () =>{
      if (beforeClose) {
        const timer = setTimeout(() => {
          handleClose()
        }, 500);
        return () => {
          clearTimeout(timer)
        }
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beforeClose]);

  return (
    <div
      className={`modal-background ${beforeClose && ' modal-background-exit'}`}
      data-test="book-modal"
      onClick={() => setBeforeClose(true)}
    >
      <div
        className={`modal-wrapper ${beforeClose && ' modal-wrapper-exit'}`}
        onClick={(e) => e.stopPropagation()}
      >

          <header className="modal-header">
            <button data-test="close-modal" className="close-modal" type="button" onClick={() => setBeforeClose(true)}>
              <CloseOutlined />
            </button>
          </header>

          <ModalBody book={book} />
          
          <footer>
            <ModalFooter book={book}/>
          </footer>

      </div>
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
