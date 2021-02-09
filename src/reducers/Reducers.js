import { combineReducers } from 'redux';
import { BookReducer } from './BookReducer';
import { CartReducer } from './CartReducer';

export const reducers = combineReducers({
    cart: CartReducer,
    books: BookReducer
})