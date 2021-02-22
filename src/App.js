import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.css';
import { BookList } from './components/Books/BookList/BookList';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ShowCart } from './components/Cart/ShowCart/ShowCart';
import { fetchBooks } from './actions/BookActions';
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
          
          <Switch>
            <Route path="/cart">
                <ShowCart />
            </Route>
            
            <Route path="/">
                <OrderBy />
                <BookList />
            </Route>
          </Switch>
        </div>
      
      </div>
    </BrowserRouter>
  );
}

export default App;
