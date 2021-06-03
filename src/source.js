import axios from 'axios';

let getAllCountries = (region) => {
    if(region) {
        return axios.get(`https://restcountries.eu/rest/v2/region/${region}`)
    } else {
        return axios.get("https://restcountries.eu/rest/v2/all");
    }
};

let getCountryByName= (name) => {
    return axios.get(`https://restcountries.eu/rest/v2/name/${name}`);
};

export {getAllCountries, getCountryByName};