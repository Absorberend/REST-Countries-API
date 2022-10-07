import React from 'react'

import "./SearchBar.css";
import searchIcon from "../Assets/search-icon.svg";

export default function SearchBar({theme, search, onSearchInputChange}) {
  return (
    <div className="search__bar__wrapper">
      <input 
        type="text" 
        value={search}
        onChange={onSearchInputChange}
        placeholder= "Search for a country..."
        className={`search__bar search__bar__${theme}`}
      />
      <img 
        src={searchIcon} 
        alt="search icon"
        className={`search__bar__icon search__bar__icon__${theme}`}
      /> 
    </div>
  )
}
