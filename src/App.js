import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Sidebar } from './components/Sidebar/Sidebar';
import { OrderBy } from './components/Books/OrderBy/OrderBy';
import { BookList } from './components/Books/BookList/BookList';
import { ShowCart } from './components/Cart/ShowCart/ShowCart';
import { Header } from './components/Header/Header';
import { useDispatch } from 'react-redux';
import { fetchBooks } from './slices/bookSlice';

function App() {
  const dispatch = useDispatch();

  //Initial fetch
  useEffect(() => {
    dispatch( fetchBooks("JavaScript") );
  }, [])

  return (
    <BrowserRouter>
      <div className="App">

        <div className="Sidebar">
          <Sidebar />
        </div>

        <div className="main">
          
          <Header />
          
          <Routes>
            <Route path="/cart" element={<ShowCart />} />
            <Route path="/:search" element={<><OrderBy /><BookList /></>} />
            <Route path="/" element={<><OrderBy /><BookList /></>} />
          </Routes>
        </div>
      
      </div>
    </BrowserRouter>
  );
}

export default App;
