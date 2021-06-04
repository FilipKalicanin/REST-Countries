import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppStateContext from './Reducer&Context/AppStateContext';
import { ThemeContext } from './Reducer&Context/ThemeContext';
import { getAllCountries } from './source';
import AllCountries from './Pages/MainPage/AllCountries';
import CountryDetails from './Pages/SelectedPage/CountryDetails';
import Header from './SharedComponent/Header';
import { Loading } from './SharedComponent/Loading';
import { ErrorPage } from './SharedComponent/ErrorPage';

const themes = {
  dark: 'dark',
  light: 'light'
};

function App() {
  const [state, dispatch] = useContext(AppStateContext);
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  useEffect(() => {
    dispatch({ type: 'LOADING_COUNTRIES_IN_PROGRESS' });
    try {
      getAllCountries(state.selectedRegion).then(res => {
        dispatch({ type: 'LOADING_COUNTRIES_SUCCESS', countries: res.data, selectedRegion: state.selectedRegion });
      });
    }
    catch (error) {
      dispatch({ type: 'LOADING_COUNTRIES_FAILED' });
    }
  }, [dispatch, state.selectedRegion]);

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
    if (currentTheme === 'light') {
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
      {state.loading === 'FAILED' ?
        <ErrorPage /> :
        <BrowserRouter>
          <Header toggleTheme={toggleTheme} />
          <Switch>
            <Route exact path="/">
              {state.loading === 'IN_PROGRESS' ?
                <Loading /> :
                <AllCountries />}
            </Route>
            <Route path="/country/:name">
              {state.loading === 'IN_PROGRESS' ?
                <Loading /> :
                <CountryDetails />}
            </Route>
          </Switch>
        </BrowserRouter>}
    </ThemeContext.Provider>
  );
}

export default App;
