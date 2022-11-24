import React from 'react'

import "./DarkModeToggle.css";
import moonLight from "../Assets/moon-light.svg";
import moonDark from "../Assets/moon-dark.svg";


export default function DarkModeToggle({theme, onThemeChangeClick}) {

  return (
    <div className='toggle__container' onClick={onThemeChangeClick}>
      <img 
        src={theme === "light" ? moonLight : moonDark}
        alt='light mode button' 
        className={`theme__img theme__img__${theme}`}
      />

      <button className='theme__btn'>Dark Mode</button>
    </div>
  )
  
}
