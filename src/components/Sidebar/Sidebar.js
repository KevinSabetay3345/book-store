import React from 'react';
import './Sidebar.css';
import  Logo from '../../Logo.png';
import { Categories } from './Categories/Categories';
import { Link } from 'react-router-dom';

export function Sidebar() {

    return (
        <div className="App-sidebar">

          { /* Logo */ }
          <Link to="/">
            <img src={Logo} className="App-logo" alt="logo" />
          </Link>

          { /* Categories */}
          <Categories />

        </div>
    )
}