import React from 'react'
import {useParams, useNavigate} from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import Error from "./Error.js";
import "./SingleCountryPage.css";
import ArrowLeft from "../Assets/arrow-narrow-left.svg";


export default function SingleCountryPage({filtered, data, theme, onBorderNavigationClick, loading}) {
  const navigate = useNavigate();
  const {id} = useParams();
  
  //check to make sure that the React router route exists.
  let filteredCodes = filtered.filter(code => code.cca3 === id);

  //Create object search values
  const langId = filteredCodes.map(country => country.languages ? Object.keys(country.languages).reverse()[0] : "").toString();
  const currId = filteredCodes.map(country => country.currencies ? Object.keys(country.currencies).toString() : "");
  let bordersArray = [];
  filteredCodes.map(country => country.borders ? country.borders.forEach(code => bordersArray.push(code)) : "");

  const borderNavigate = (country) => {
    onBorderNavigationClick();
    navigate(`/location/${country.cca3}`)
  }

  //bordering countries filter
  const borderCountries = data.map(country => {
    if (bordersArray.includes(country.cca3)) {
      return (
      <button 
        key={country.cca3}
        onClick={() => borderNavigate(country)}
        className={`single__page__button single__page__button__${theme}`}
      >
          {country.name.common}
      </button>
      )} 

      return "";
  });

  
  //map over the filtered country to create and display the single country page
  const singlyCountry = filteredCodes.map(country => (
      <div 
        key={country.cca3}
        className="single__page__container"
        >
        <div className="single__page__flag">
          <img src={country.flags.png} alt={`${country.name.common}`} />
        </div>
        <h2 className="single__page__country__header">{country.name.common}</h2>
        <div className="single__page__info__container">
          <div className="single__page__main__info">
            <span>Native Name:
              <span className="single__page__main__subtext">
                {country.name.nativeName[`${langId}`].common}
              </span>
            </span>
            <span>Population:
              <span className="single__page__main__subtext">
                {country.population.toLocaleString('en-US')}
              </span>
            </span>
            <span>Region:
              <span className="single__page__main__subtext">
                {country.region}
              </span>
            </span>
            <span>Sub Region:
              <span className="single__page__main__subtext">
                {country.subregion === undefined ? "" : country.subregion }
              </span>
            </span>
            <span>Capital:
              <span className="single__page__main__subtext">
                {country.capital === undefined ? "" : country.capital.join(", ")}
              </span>
            </span>
          </div>

          <div className="single__page__secondary__info">
            <span>Top Level Domain:
              <span className="single__page__main__subtext">
                {country.tld ? country.tld.join(", ") : ""}
              </span>
            </span>
            <span> Currencies:
              <span className="single__page__main__subtext">
                {country.currencies[`${currId}`] === undefined ? "" : country.currencies[`${currId}`].name }
              </span>
            </span>
            <span>Languages:
              <span className="single__page__main__subtext">
                {Object.values(country.languages).reverse().join(', ')}
              </span>
            </span>
          </div>
       
        </div>
          <div className="single__page__border__countries">
            <h4>Border Countries:</h4>
            <div className="single__page__border__button__container">
                {borderCountries}
            </div>
          </div>  

      </div>
    ));


  if (filteredCodes.length > 0) {
    return (
      <div>
        <div className="single__page__back__button__wrapper">
          <button 
            onClick={() => navigate("/")}
            className={`single__page__back__button single__page__button__${theme}`}>
              <img 
                src={ArrowLeft} 
                alt="Back home arrow" 
                className={`single__page__arrow single__page__arrow__${theme}`}
                />
              Back
            </button>
        </div>
        {singlyCountry}
      </div>
    )
  } else {
    return (
    <>
      {loading && <div className="single__page__loading__spinner">
        <ClipLoader loading={loading} color="var(--light-mode-input)" speedMultiplier="1" size="25px" />
      </div>}
      {!loading && <Error />}
    </>
    )
  }
}
