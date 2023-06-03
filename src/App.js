import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.css';
import { BookList } from './components/Books/BookList/BookList';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ShowCart } from './components/Cart/ShowCart/ShowCart';
import { fetchBooks } from './slices/bookSlice';
import { SearchBar } from './components/Header/SearchBar/SearchBar';
import { CartMenu } from './components/Header/CartMenu/CartMenu';
import { OrderBy } from './components/Books/OrderBy/OrderBy';

function App() {
  const dispatch = useDispatch();
  
  //Default search
  useEffect( () => {
    dispatch( fetchBooks("JavaScript") );
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className="App">

        <div className="Sidebar">
          <Sidebar />
        </div>

        <div className="main">
          
          <div className="main-header"> 
            <SearchBar />
            <CartMenu />
          </div>
          
          <Routes>
            <Route path="/cart" element={<ShowCart />}></Route>
            <Route path="/" element={<><OrderBy /><BookList /></>}></Route>
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </div>
      
      </div>
    </BrowserRouter>
  );
}

export default App;
