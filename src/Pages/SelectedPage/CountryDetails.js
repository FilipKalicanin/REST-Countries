import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getCountryByName } from '../../source';
import AppStateContext from '../../Reducer&Context/AppStateContext';
import IconBack from '../../SharedComponent/IconBack';
import Flag from './Flag';
import DetailData from './DetailData';
import { ErrorPage } from '../../SharedComponent/ErrorPage';
import { Loading } from '../../SharedComponent/Loading';
import { ThemeContext } from '../../Reducer&Context/ThemeContext';

function CountryDetails() {
    const history = useHistory();
    const urlCountryName = useParams();
    const [selectedCountryData, setSelectedCountryData] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const context = useContext(ThemeContext);
    const [state] = useContext(AppStateContext);

    useEffect(() => {
        let mounted = true;
        try {
            getCountryByName(urlCountryName.name).then(res => {
                if(mounted) {
                    setSelectedCountryData(res.data[0]);
                    setIsLoading(false);
                }
            })
        } catch (error) {
            setError(true);
        }
        return() => {
            mounted = false;
        }
    }, [urlCountryName.name])

    function handleButtonBack() {
        history.push('/');
    }

    return (
        error ?
            <ErrorPage /> :
            
            <div>
                {isLoading ?
                    <Loading /> :
                    <>
                        <div className='section-back'>
                            <div className={context.currentTheme === 'light' ?
                                'button-back-container' :
                                'button-back-container-dark'}
                                onClick={handleButtonBack} >
                                <IconBack />
                                <p className="text">Main Page</p>
                            </div>
                        </div>
                        <div className='country-details-container'>
                            <div className={context.currentTheme === 'light' ?
                                'country-details-data-container' :
                                'country-details-data-container-dark'} >
                                <Flag flagURL={selectedCountryData.flag} />
                            </div>
                            <div className={context.currentTheme === 'light' ?
                                'country-details-data-container' :
                                'country-details-data-container-dark'} >
                                <DetailData countryData={selectedCountryData} countryCodes={state.countryCodes} />
                            </div>
                        </div>
                    </>}
            </div>
    )
}

export default CountryDetails;
