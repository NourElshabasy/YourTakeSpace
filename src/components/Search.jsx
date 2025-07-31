import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

import search from "../assets/search.png";

const Search = ({ setQuery }) => {
    const [localQuery, setLocalQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    setQuery(localQuery); 
    navigate("/");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };


  return (
    <div className="search-bar">
      <input
        className="search"
        type="text"
        value={localQuery}
        placeholder="Search"
        onChange={(e) => setLocalQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="search-button" onClick={handleSearch}>
        <img src={search} className="search-icon"/>
      </div>
    </div>
  );
};

export default Search;
