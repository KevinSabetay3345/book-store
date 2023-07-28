import React from 'react';
import './Sidebar.css';
import  Logo from '../../Logo.png';
import { Categories } from './Categories/Categories';

export function Sidebar() {

    return (
        <div className="App-sidebar">

          { /* Logo */ }
          <img src={Logo} className="App-logo" alt="logo" />

          { /* Categories */}
          <Categories />

        </div>
    )
}