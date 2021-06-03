import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AllCountries from './MainPage/AllCountries';
import CountryDetails from './SelectedPage/CountryDetails';
import Header from './SharedComponent/Header';
import { Loading } from './SharedComponent/Loading';
import { ThemeContext } from './SharedComponent/ThemeContext';
import { getAllCountries } from './source';
import AppStateContext from './SharedComponent/AppStateContext';
import { ErrorPage } from './SharedComponent/ErrorPage';

const themes = {
  dark: 'dark',
  light: 'light'
};

function App() {
  const [state, dispatch] = useContext(AppStateContext);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  useEffect(() => {
    try {
      getAllCountries(selectedRegion).then(res => {
        let codes = res.data.reduce((obj, item) => {
          return {
            ...obj,
            [item.alpha3Code]: item.name,
          }
        }, {});
        dispatch({ type: 'LOADING_COUNTRIES_SUCCESS', countries: res.data, countryCodes: codes });
      })
    }
    catch (error) {
      dispatch({ type: 'LOADING_COUNTRIES_FAILED' })
    }
  }, [dispatch, selectedRegion]);

  useEffect(() => {
    let currTheme = JSON.parse(localStorage.getItem("theme"));
    if (currTheme) {
      setCurrentTheme(currTheme);
      document.body.className = `background-${currTheme}`;
    } else {
      localStorage.setItem('theme', JSON.stringify(themes.light));
      setCurrentTheme(themes.light);
      document.body.className = `background-light`;
    }
  }, []);

  function toggleTheme() {
    if(currentTheme === 'light') {
      setCurrentTheme(themes.dark);
      document.body.className = `background-${themes.dark}`;
      localStorage.setItem('theme', JSON.stringify(themes.dark));
    } else {
      setCurrentTheme(themes.light);
      document.body.className = `background-${themes.light}`;
      localStorage.setItem('theme', JSON.stringify(themes.light));
    }
  }

  return (
    <ThemeContext.Provider value={{ currentTheme: currentTheme }}>
      {state.error ? 
      <ErrorPage /> :
      <BrowserRouter>
        <Header toggleTheme={toggleTheme} />
        <Switch>
          <Route exact path="/">
            {state.isLoading ? 
            <Loading /> :
            <AllCountries setSelectedRegion={setSelectedRegion} />}
          </Route>
          <Route path="/country/:name">
          {state.isLoading ? 
            <Loading /> :
            <CountryDetails setSelectedRegion={setSelectedRegion} />}
          </Route>
        </Switch>
      </BrowserRouter>}
    </ThemeContext.Provider>
  );
}

export default App;
