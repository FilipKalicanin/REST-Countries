import React, { useContext } from 'react'
import { IconSearch } from '../../SharedComponent/IconSearch'
import { ThemeContext } from '../../Reducer&Context/ThemeContext';
import AppStateContext from '../../Reducer&Context/AppStateContext';

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

function FilterDataContainer({ setSearchInput, setCurrentPage }) {
    const context = useContext(ThemeContext);
    const [ ,dispatch] = useContext(AppStateContext);

    function handleInput(e) {
        e.preventDefault();
        setSearchInput(e.target.value);
        setCurrentPage(1);
    }

    function handleSelect(e) {
        if (e.target.value === 'displayAll') {
            dispatch({type: 'SELECTED_REGION', selectedRegion: ''});
            setCurrentPage(1);
        } else {
            dispatch({type: 'SELECTED_REGION', selectedRegion: e.target.value});
            setCurrentPage(1);
        }
    }

    return (
        <>
            <div className='search-section-container'>
                <div className={context.currentTheme === 'light' ?
                    'search-section-input-container' :
                    'search-section-input-container-dark'} >
                    <IconSearch />
                    <input
                        type="text"
                        placeholder='Search...'
                        className='search-input'
                        onChange={handleInput}
                    />
                </div>
                <div className={context.currentTheme === 'light' ?
                'search-section-select-container' :
                'search-section-select-container-dark'} >
                    <select className={context.currentTheme === 'light' ?
                    'select-input' :
                    'select-input-dark'}
                    onChange={handleSelect} >
                        <option value='displayAll'>Filter by Region</option>
                        {regions.map(region => <option value={region} key={region}>{region}</option>)}
                    </select>
                </div>
            </div>
        </>
    )
}

export default FilterDataContainer;
