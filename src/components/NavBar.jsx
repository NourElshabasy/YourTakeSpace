import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

import logo from "../assets/logo.png";

import Search from "./Search";

const NavBar = ({ setQuery }) => {
  return (
    <div className="nav-bar">
      <Link to="/">
        <img src={logo} alt="logo" width={100} className="logo"/>
      </Link>
      <Search setQuery={setQuery} className="nav-bar-search" />
      <Link to="/" className="nav-bar-home">
        <h3>Home</h3>
      </Link>
      <Link to="/create" className="nav-bar-create">
        <h3>Create</h3>
      </Link>
    </div>
  );
};

export default NavBar;
