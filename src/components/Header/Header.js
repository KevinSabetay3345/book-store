import React from 'react';
import './Header.css';
import { SearchBar } from './SearchBar/SearchBar';
import { CartMenu } from './CartMenu/CartMenu';
import { LangSelector } from './LangSelector/LangSelector';

export function Header() {
    return (
      <div className="main-header"> 
        <SearchBar />
        <CartMenu />
        <LangSelector />
      </div>
    )
}
