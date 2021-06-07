import React, { useReducer } from 'react';
import AppStateContext from '../Reducer&Context/AppStateContext';

export function AppStateProviderComponent({ children, initialState = {}, reducer }) {
    const value = useReducer(reducer, initialState);

    return (
        <AppStateContext.Provider value={value}>
            {children}
        </AppStateContext.Provider>
    )
}