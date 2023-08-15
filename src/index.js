import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import bookReducer from './slices/bookSlice'
import cartReducer from './slices/cartSlice'
import langReducer from './slices/langSlice'
import ReactGA from "react-ga4";

ReactGA.initialize("G-B0C01XQ4C7");

export const store = configureStore({
  reducer: {
    books: bookReducer,
    cart: cartReducer,
    langs: langReducer,
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

const SendAnalytics = ()=> {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname + window.location.search,
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(SendAnalytics);
