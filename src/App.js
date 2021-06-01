import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AllCountries from './MainPage/AllCountries'
import CountryDetails from './SelectedPage/CountryDetails'
import Header from './SharedComponent/Header';
import { ErrorPage } from './SharedComponent/ErrorPage';
import { Loading } from './SharedComponent/Loading';
import { getAllCountries } from './source';
import { ThemeContext } from './SharedComponent/ThemeContext';

const themes = {
  dark: 'dark',
  light: 'light'
};

function App() {
  const [countries, setCountries] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  useEffect(() => {
    try {
      if (selectedRegion) {
        getAll(selectedRegion);
      } else {
        getAll();
      }
    }
    catch (error) {
      setError(true)
    }
  }, [selectedRegion])

  function getAll(selectedRegion) {
    getAllCountries(selectedRegion).then(res => {
      setCountries(res.data)
      setIsLoading(false);
      return res.data;
    })
      .then(res => {
        let arr = res.reduce((obj, item) => {
          return {
            ...obj,
            [item.alpha3Code]: item.name,
          }
        }, {})
        setCountryCodes(arr)
      })
  }

  function toggleTheme() {
    currentTheme === 'light' ? setCurrentTheme(themes.dark) : setCurrentTheme(themes.light);
    document.body.classList.toggle('background-dark');
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme: toggleTheme, currentTheme: currentTheme }}>
      {error ?
        <ErrorPage />
        :
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/">
              {isLoading ? <Loading /> : <AllCountries
                countries={countries}
                setSelectedRegion={setSelectedRegion}
              />}
            </Route>
            <Route path="/country/:name">
              {isLoading ? <Loading /> : <CountryDetails countryCodes={countryCodes} />}
            </Route>
          </Switch>
        </BrowserRouter>}
    </ThemeContext.Provider>
  )
}

export default App;
