import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppStateContext from './SharedComponent/AppStateContext';

function AppStateProviderComponent({ children, initialState = {}, reducer }) {
  const value = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  )
}

const countryReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING_COUNTRIES_STARTED': {
      return {
        ...state,
        isLoading: true,
        countries: [],
        countryCodes: [],
        error: false
      };
    }
    case 'LOADING_COUNTRIES_SUCCESS': {
      // function getCountryCodes(allCountries) {
      //   let codes = allCountries.reduce((obj, item) => {
      //     return {
      //       ...obj,
      //       [item.alpha3Code]: item.name,
      //     }
      //   }, {});
      //   return codes;
      // }
      return {
        ...state,
        isLoading: false,
        countries: action.countries,
        countryCodes: action.countryCodes,
        error: false
      };
    }
    case 'LOADING_COUNTRIES_FAILED': {
      return {
        ...state,
        isLoading: false,
        countries: [],
        countryCodes: [],
        error: true
      };
    }
    default: {
      return state
    }
  }
}

const initialState = {
  isLoading: true,
  error: '',
  countries: [],
  countryCodes: [],
  selectedRegion: '',
}

ReactDOM.render(
  <React.StrictMode>
    <AppStateProviderComponent reducer={countryReducer} initialState={initialState} >
      <App />
    </AppStateProviderComponent>
  </React.StrictMode>,
  document.getElementById('root')
);

