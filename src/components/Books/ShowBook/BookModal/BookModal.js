import React from 'react';
import './BookModal.css';
import { CloseOutlined } from '@ant-design/icons';
import { ModalBody } from './ModalBody/ModalBody';
import { ModalFooter } from './ModalFooter/ModalFooter'

export const BookModal = ( { book, handleClose } ) => {
    
  return (
        <div className="modal-main">
          
          <header className="modal-header">
            <button className="close-modal" type="button" onClick={handleClose}>
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

