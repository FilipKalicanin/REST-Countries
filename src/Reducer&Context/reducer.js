export const countryReducer = (state, action) => {
    switch (action.type) {

        case 'LOADING_COUNTRIES_IN_PROGRESS': {
            return {
                ...state,
                loading: 'IN_PROGRESS',
                countries: [],
                countryCodes: [],
            };
        }

        case 'LOADING_COUNTRIES_SUCCESS': {
            function getCountryCodes(allCountries) {
                let codes = allCountries.reduce((obj, item) => {
                    return {
                        ...obj,
                        [item.alpha3Code]: item.name,
                    }
                }, {});
                return codes;
            }
            return {
                ...state,
                loading: 'SUCCSESSFUL',
                countries: action.countries,
                countryCodes: getCountryCodes(action.countries),
                selectedRegion: action.selectedRegion
            };
        }

        case 'LOADING_COUNTRIES_FAILED': {
            return {
                ...state,
                loading: 'FAILED',
                countries: [],
                countryCodes: [],
            };
        }

        case 'SELECTED_REGION': {
            return {
                ...state,
                selectedRegion: action.selectedRegion,
            }
        }

        case 'SEARCH_INPUT': {
            return {
                ...state,
                searchInput: action.searchInput,
            }
        }

        default: {
            return state
        }
    }
}

export const initialState = {
    loading: true,
    error: false,
    countries: [],
    countryCodes: [],
    selectedRegion: '',
    searchInput: ''
}