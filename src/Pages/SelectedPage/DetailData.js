import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../../Reducer&Context/ThemeContext';

function DetailData({ countryData, countryCodes }) {
    const history = useHistory();
    const context = useContext(ThemeContext)

    function redirectToDetailsPage(countryName) {
        history.push(`/country/${countryName}`)
    }

    return (
        <div className='country-data-wrapper'>
            <div className='detail-data-heading-wrapper'>
                <h3 className="detail-data-heading">{countryData.name}</h3>
            </div>
            <div>
                <ul className="detail-data-ul">
                    <li className="detail-data-ul-li"><strong>Native Name: </strong>{countryData.nativeName}</li>
                    <li className="detail-data-ul-li"><strong>Population: </strong>{countryData.population}</li>
                    <li className="detail-data-ul-li"><strong>Region: </strong>{countryData.region}</li>
                    <li className="detail-data-ul-li"><strong>Sub Region: </strong>{countryData.subregion}</li>
                    <li className="detail-data-ul-li"><strong>Capital: </strong>{countryData.capital}</li>
                    <li className="detail-data-ul-li"><strong>Top Level Domain: </strong>{countryData.topLevelDomain}</li>
                    <li className="detail-data-ul-li"><strong>Currencies: </strong>{countryData?.currencies?.[0].name}</li>
                    <li className="detail-data-ul-li"><strong>Languages: </strong><div className="detail-data-languages-holder">
                        <div className="flex-languages">
                            {countryData?.languages?.map(el =>
                                <div className="each-language-wrapper" key={el.name} >
                                    {
                                        countryData?.languages?.length > 1 ?
                                            <p>{el.name}, </p> :
                                            <p>{el.name}</p>
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                    </li>
                </ul>
            </div>
            <div className='border-countries-wrapper'>
                <div className='border-countries-span'><strong>Border countries:</strong></div>
                <div className="border-countries-holder">
                    <div className="border-countries-flex">
                        <div>{countryData?.borders?.map(border => {
                            return <div key={border} onClick={() => redirectToDetailsPage(countryCodes[border])} className={context.currentTheme === 'light' ? 'border-country-each' : 'border-country-each-dark'}>{countryCodes[border]}</div>
                        })}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailData
