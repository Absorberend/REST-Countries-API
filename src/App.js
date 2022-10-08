import {useEffect, useState} from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import './App.css';
import useFetch from "./Hooks/useFetch.js";
import DarkModeToggle from "./Components/DarkModeToggle.js";
import RegionFilter from "./Components/RegionFilter.js";
import SearchBar from "./Components/SearchBar.js";
import CountryContainer from "./Components/CountryContainer.js";
import SingleCountryPage from "./Components/SingleCountryPage.js";
import Error from "./Components/Error.js";

let didInit = false;


function App() {
  const {get, loading} = useFetch("https://restcountries.com/v3.1/");
  const [data, setData] = useState([]);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
 

  useEffect(() => {
    document.body.removeAttribute('class');
    document.body.classList.add(`body__${theme}__theme`);

    get("all").then(data => {
      if (!didInit) {
        setData(data);
        setFiltered(data);
        didInit = true;
      }
    })
    .catch(error => console.error(error));    
  }, []);

  useEffect(() => {
    document.body.removeAttribute('class');
    document.body.classList.add(`body__${theme}__theme`);

    localStorage.setItem("theme", theme); 
  }, [theme]);

  useEffect(() => {
    setFiltered(data.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())));
  }, [search])

  const handleThemeChangeClick = () => {
    if (theme === "light") {
      setTheme(prevTheme => prevTheme = "dark"); 
    } else {
      setTheme(prevTheme => prevTheme = "light");
    }
  }

  const handleDropDownSelectionClick = (e) => {
    setFiltered(data.filter(country => e.target.innerText === country.region));
  }

  const handleBorderNavigationClick = () => {
    setFiltered(data);
  }

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  }

  return (
    <>
      <header className={`App__header App__header__${theme}`}>
        <div className="App__header__wrapper">
          <h1>Where in the world?</h1>
          <DarkModeToggle  theme={theme} onThemeChangeClick={handleThemeChangeClick} />
        </div>
      </header>
      <main className={`App__main App__main__${theme}`}>
        <div className="App__content__wrapper">

          <HashRouter>
            <Routes>
              <Route path="/" element={(
                  <>
                    <section className="App__filter__section">
                      <SearchBar theme={theme} search={search} onSearchInputChange={handleSearchInputChange} />
                      <RegionFilter theme={theme} onDropDownSelectionPick={handleDropDownSelectionClick} />
                    </section><section className="App__country__container">
                      <ClipLoader loading={loading} color="var(--light-mode-input)" speedMultiplier="1" size="25px" className="App__loading__spinner" />
                      {!loading && <CountryContainer data={data} theme={theme} filtered={filtered} />}
                    </section>
                  </>
              )} />
              <Route path="/location/:id" element={<SingleCountryPage filtered={filtered} data={data} theme={theme} onBorderNavigationClick={handleBorderNavigationClick} loading={loading} />} />
              <Route path='*' element={<Error />} />
            </Routes>
          </HashRouter>
        </div>
      </main>
    </>
  );
}

export default App;
