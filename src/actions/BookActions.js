import axios from 'axios';
import _ from 'lodash';

// fetchBooks using thunk
export const fetchBooks = (searchCode) => (dispatch) => {
    dispatch( isLoaded(false) );
    dispatch( clearError() );

    const requestFreeBooks = axios.get("https://www.googleapis.com/books/v1/volumes?maxResults=20&filter=free-ebooks&q=" + searchCode);
    const requestPaidBooks = axios.get("https://www.googleapis.com/books/v1/volumes?maxResults=20&filter=paid-ebooks&q=" + searchCode);

    axios.all([requestFreeBooks, requestPaidBooks]).then(axios.spread((...responses) => {

        const freeBooks = (responses[0].data.totalItems > 0) ? responses[0].data.items : [];
        const paidBooks = (responses[1].data.totalItems > 0) ? responses[1].data.items : [];
        dispatch( setBooks( _.shuffle( freeBooks.concat(paidBooks)) ) )
        dispatch( isLoaded(true) );
    
    })).catch(errors => {
        dispatch( fetchError(errors) );
        dispatch( isLoaded(true) );
    })
}

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






