import axios from 'axios';
import _ from 'lodash';

export function setBooks(books){
    return {
        type: "SET_BOOKS",
        payload: { books: books }
    }
}

export function isLoaded(loaded){
    return {
        type: "IS_LOADED",
        payload: { loaded: loaded }
    }
}

export function fetchError(error){
    return {
        type: "ERROR",
        payload: { error: error }
    }
}

export function clearError(error){
    return {
        type: "CLEAR_ERROR"
    }
}

export function orderBooks(books, orderType){
    switch (orderType){
        case "LOW_PRICE" :
            return {
                type: "SET_BOOKS",
                payload: { books: [...books].sort( (a, b) => a.price > b.price ? 1 : -1 ) }
            };
        case "HIGH_PRICE" :
            return {
                type: "SET_BOOKS",
                payload: { books: [...books].sort( (a, b) => a.price < b.price ? 1 : -1 ) }
            };
        case "OLD" :
            return {
                type: "SET_BOOKS",
                payload: { books: [...books].sort( (a, b) => a.publishedDate === "" ? 1 : ( a.publishedDate > b.publishedDate ? 1 : -1 ) ) }
            }
        case "NEW" :
            return {
                type: "SET_BOOKS",
                payload: { books: [...books].sort( (a, b) => a.publishedDate === "" ? 1 : ( a.publishedDate < b.publishedDate ? 1 : -1 ) ) }
            }
        default:
            return {
                type: "SET_BOOKS",
                payload: { books: books }
            }
    }
}

// fetchBooks using thunk
export const fetchBooks = (searchCode) => (dispatch) => {
    dispatch( isLoaded(false) );
    dispatch( clearError() );

    const requestFreeBooks = axios.get("https://www.googleapis.com/books/v1/volumes?maxResults=20&filter=free-ebooks&q=" + searchCode);
    const requestPaidBooks = axios.get("https://www.googleapis.com/books/v1/volumes?maxResults=20&filter=paid-ebooks&q=" + searchCode);

    axios.all([requestFreeBooks, requestPaidBooks]).then(axios.spread((...responses) => {

        const freeBooks = (responses[0].data.totalItems > 0) ? responses[0].data.items : [];
        const paidBooks = (responses[1].data.totalItems > 0) ? responses[1].data.items : [];
        const books = cleanBooks(freeBooks.concat(paidBooks));
        dispatch( setBooks( _.shuffle( books ) ) )
        dispatch( isLoaded(true) );
    
    })).catch(errors => {
        dispatch( fetchError(errors) );
        dispatch( isLoaded(true) );
    })
}


/* Cleanbooks takes only the parameters that matter and makes them readable */
function cleanBooks(books){
    return books.map(book => {
        const bookInfo = book.volumeInfo;
        const id = book.id;
        const imgLink = ( bookInfo.imageLinks ) ? book.volumeInfo.imageLinks.thumbnail : "";
        const title = ( bookInfo.title ) ? bookInfo.title : "";
        const authors = ( bookInfo.authors ) ? book.volumeInfo.authors.join(', ') : "";
        const publishedDate = ( bookInfo.publishedDate ) ? bookInfo.publishedDate : "";
        const description = ( bookInfo.description ) ? bookInfo.description : "";
        const pageCount = ( bookInfo.pageCount ) ? bookInfo.pageCount : 0;
        const saleability = book.saleInfo.saleability;
        const price = (saleability === "FOR_SALE") ? book.saleInfo.retailPrice.amount : 0; 
        const webReaderLink = (saleability === "FREE") ? book.accessInfo.webReaderLink : "";
        
        return {
            id: id,
            imgLink: imgLink,
            title: title,
            authors: authors,
            publishedDate: publishedDate,
            description: description,
            pageCount: pageCount,
            saleability: saleability,
            price: price,
            webReaderLink: webReaderLink
        }
    });   
}