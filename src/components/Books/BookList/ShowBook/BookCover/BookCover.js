import React, { useState } from 'react';
import './BookCover.css';
import { ShoppingCartOutlined, ReadOutlined } from '@ant-design/icons';

export const BookCover = ( { book, showModal } ) => {
    const bookInfo = book.volumeInfo;
    const imgLink = ( bookInfo.imageLinks ) ? book.volumeInfo.imageLinks.thumbnail : "";
    const title = bookInfo.title;
    const authors = ( bookInfo.authors ) ? book.volumeInfo.authors.join(', ') : "";
    const date = bookInfo.publishedDate;
    const [visible, setVisible] = useState(false);

    return (
        <div className="book-cover" onClick={ () => showModal(true) }>
            
            <div className="img">
                <img 
                srcSet={imgLink} 
                src="https://linnea.com.ar/wp-content/uploads/2018/09/404PosterNotFoundReverse.jpg"
                alt={title}
                onLoad={ () => setVisible(true) }
                />
            </div>

            { /* shows when hover, "visible" assures to show the image first */ }
            { visible &&
            <div className="img-hover-details">
                { book.saleInfo.saleability === "FOR_SALE" && 
                <span className="saleability"><ShoppingCartOutlined /></span>}
                { book.saleInfo.saleability === "FREE" && 
                <span className="saleability"><ReadOutlined /></span>}
                
                <p className="title">{ title.length > 50 ? title.substring(0, 35) + "..." : title }</p>
                <p className="subtitle">{ authors.length > 50 ? authors.substring(0,50) + "..." : authors} {date}</p>
            </div>
            }
            
        </div>
    )
}