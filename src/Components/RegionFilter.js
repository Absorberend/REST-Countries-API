import React, {useState, useRef}  from 'react';
import chevronDown from "../Assets/chevron-down.svg";
import chevronUp from "../Assets/chevron-up.svg";
import useCloseOnEsc from '../Hooks/useCloseOnEsc';
import useOutsideClick from '../Hooks/useOutsideClick.js';
import "./RegionFilter.css";



export default function RegionFilter({theme, onDropDownSelectionPick}) {
  const [dropDown, setDropDown] = useState(false);
  const ref = useRef();

  useOutsideClick(ref, () => setDropDown(false))
  useCloseOnEsc(() => setDropDown(false));

  const handleDropDownClick = () => {
    setDropDown(prevDropDown => !prevDropDown);
  }


  return (
      <div className="dropdown__container" ref={ref}>
        <button 
          className={`dropdown__button dropdown__button__${theme}`}
          onClick={handleDropDownClick}
          >
            Filter by Region
            <img 
              src={dropDown? chevronDown : chevronUp} 
              className={`dropdown__chevron dropdown__chevron__${theme}`} 
              alt="dropdown chevron"
            />
        </button>
        {dropDown && (
          <ul className={`dropdown__list dropdown__list__${theme}`}>
            <li>
              <button onClick={onDropDownSelectionPick}>Africa</button>
            </li>
            <li>
              <button onClick={onDropDownSelectionPick}>Americas</button>
            </li>
            <li>
              <button onClick={onDropDownSelectionPick}>Asia</button>
            </li>
            <li>
              <button onClick={onDropDownSelectionPick}>Europe</button>
            </li>
            <li>
              <button onClick={onDropDownSelectionPick}>Oceania</button>
            </li>
          </ul>
        )}
      </div>
  )
}
