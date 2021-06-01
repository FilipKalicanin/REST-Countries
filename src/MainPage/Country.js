import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../SharedComponent/ThemeContext';

function Country({ country }) {
    const history = useHistory();
    const countryName = country.name;
    const context = useContext(ThemeContext);

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    function redirectToDetailsPage() {
        history.push(`/country/${countryName}`)
    }

    return (
        <div className={context.currentTheme === 'light' ? 'one-country-container' : 'one-country-container-dark'} onClick={redirectToDetailsPage}>
            <div className='image-container'>
                <img src={country.flag} alt='country-flag-img' className="country-flag"></img>
            </div>
            <div className='data-container'>
                <div className='country-name'>
                    <h3>{country.name}</h3>
                </div>
                <div className='country-data'>
                    <div className='country-data-positioning'>
                        <h5 className='country-data-heading'>Population:</h5>
                        <p className='country-data-text'>{formatNumber(country.population)}</p>
                    </div>
                    <div className='country-data-positioning'>
                        <h5 className='country-data-heading'>Region:</h5>
                        <p className='country-data-text'>{country.region}</p>
                    </div>
                    <div className='country-data-positioning'>
                        <h5 className='country-data-heading'>Capital:</h5>
                        <p className='country-data-text'>{country.capital}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Country
