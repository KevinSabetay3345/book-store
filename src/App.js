import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Sidebar } from './components/Sidebar/Sidebar';
import { OrderBy } from './components/Books/OrderBy/OrderBy';
import { BookList } from './components/Books/BookList/BookList';
import { ShowCart } from './components/Cart/ShowCart/ShowCart';
import { Header } from './components/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <div className="Sidebar">
          <Sidebar />
        </div>

        <div className="main">
          
          <Header />
          
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
