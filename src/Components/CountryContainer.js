import React from 'react'
import { useNavigate } from "react-router-dom";

import "./CountryContainer.css";

export default function CountryContainer({filtered, theme}) {  
  const navigate = useNavigate();


  const countryCards =  filtered.map(country => (
    <div 
      key={country.cca3} 
      className={`country__container country__container__${theme}`}
      onClick={() => navigate(`/location/${country.cca3}`)}
      >
        <img 
          src={country.flags.png} 
          alt={`${country.name.common} flag`}
          className="country__flags" 
        />
        <div className="country__content__container">
        <h2>{country.name.common}</h2>
          <span className="country__text">
            Population:
            <span className="country__plain__text">{country.population.toLocaleString('en-US')}</span>
          </span>
          <span className="country__text">
            Region:
            <span className="country__plain__text">{country.region}</span>
          </span>
          <span className="country__text">
            capitol:
            <span className="country__plain__text">{country.capitol === undefined ? null : country.capitol.join(", ")}</span>
          </span>
        </div>
    </div>
  ));
  

  return (
    <>
      {countryCards}
    </>
  )
}
