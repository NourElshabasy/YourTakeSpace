import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

import logo from '../assets/logo.png';

import Search from './Search';

const NavBar = () => {
  return (
    <div className='nav-bar'>
        <Link to="/"><img src={logo} alt="logo" width={100}/></Link>
        <Search/>
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
      
    </div>
  );
};

export default NavBar;