// import { getAllCountries } from '../source';

// export function getAll(dispatch) {
//     getAllCountries().then(res => {

//         let countryCodes = res.data.reduce((obj, item) => {
//             return {
//                 ...obj,
//                 [item.alpha3Code]: item.name,
//             }
//         }, {})

//         dispatch({type: 'LOADING_COUNTRIES_SUCCESS', countries: res.data, countryCodes: countryCodes});
//     })
// }