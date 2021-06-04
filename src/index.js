import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppStateProviderComponent } from './Reducer&Context/AppStateProvider';
import { initialState, countryReducer } from './Reducer&Context/reducer';

ReactDOM.render(
  <React.StrictMode>
    <AppStateProviderComponent reducer={countryReducer} initialState={initialState} >
      <App />
    </AppStateProviderComponent>
  </React.StrictMode>,
  document.getElementById('root')
);

