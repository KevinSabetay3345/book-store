import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import _ from 'lodash';

/* Cleanbooks takes only parameters to be used */
function cleanBooks(books){
  return books.map(book => {
      const bookInfo = book.volumeInfo;
      const id = book.id;
      const imgLink = ( bookInfo.imageLinks ) ? `https${bookInfo.imageLinks.smallThumbnail.substring(4)}` : "";
      const title = ( bookInfo.title ) ? bookInfo.title : "";
      const authors = ( bookInfo.authors ) ? book.volumeInfo.authors.join(', ') : "";
      const publishedDate = ( bookInfo.publishedDate ) ? bookInfo.publishedDate : "";
      const description = ( bookInfo.description ) ? bookInfo.description : "";
      const pageCount = ( bookInfo.pageCount ) ? bookInfo.pageCount : 0;
      const saleability = book.saleInfo.saleability;
      const price = (saleability === "FOR_SALE") ? book.saleInfo.retailPrice.amount : 0; 
      const webReaderLink = (saleability === "FREE") ? book.accessInfo.webReaderLink : "";
      
      return {
          id,
          imgLink,
          title,
          authors,
          publishedDate,
          description,
          pageCount,
          saleability,
          price,
          webReaderLink
      }
  });   
}

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (searchCode) => {
    
    let freeBooks = await axios.get("https://www.googleapis.com/books/v1/volumes?maxResults=20&filter=free-ebooks&q=" + searchCode);
    let paidBooks = await axios.get("https://www.googleapis.com/books/v1/volumes?maxResults=20&filter=paid-ebooks&q=" + searchCode);

    freeBooks = (freeBooks.data.totalItems > 0) ? freeBooks.data.items : [];
    paidBooks = (paidBooks.data.totalItems > 0) ? paidBooks.data.items : [];
    
    const books = cleanBooks(freeBooks.concat(paidBooks));

    return _.shuffle( books )
  }
)

const initialState = {
  bookList: [],
  error: '',
  isLoaded: false,
  orderBy: 'default'
}

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    orderBooks: (state, action) => {
      state.orderBy = action.payload

      switch (action.payload){
        case "LOW_PRICE" :
          state.bookList = state.bookList.sort( (a, b) => a.price > b.price ? 1 : -1 )
          break
        case "HIGH_PRICE" :
          state.bookList = state.bookList.sort( (a, b) => a.price < b.price ? 1 : -1 )
          break
        case "OLD" :
          state.bookList = state.bookList.sort( (a, b) => a.publishedDate === "" ? 1 : ( a.publishedDate > b.publishedDate ? 1 : -1 ) )
          break
        case "NEW" :
          state.bookList = state.bookList.sort( (a, b) => a.publishedDate === "" ? 1 : ( a.publishedDate < b.publishedDate ? 1 : -1 ) )
          break
        default:
          break
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.isLoaded = false
      state.error = ''
      state.orderBy = 'default'
    })
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.isLoaded = true
      state.bookList = action.payload
    })
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.isLoaded = true
      state.error = action.error.message
    })
  }
})

export const { orderBooks } = bookSlice.actions

export default bookSlice.reducer

