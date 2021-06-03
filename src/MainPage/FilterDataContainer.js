import React, { useContext } from 'react'
import { SearchIcon } from '../SharedComponent/SearchIcon'
import { ThemeContext } from '../SharedComponent/ThemeContext';

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

function FilterDataContainer({ setSearchInput, setSelectedRegion, setCurrentPage }) {
    const context = useContext(ThemeContext);

    function handleInput(e) {
        e.preventDefault();
        setSearchInput(e.target.value);
        setCurrentPage(1);
    }

    function handleSelect(e) {
        if (e.target.value === 'heading') {
            setSelectedRegion('');
            setCurrentPage(1);
        } else {
            setSelectedRegion(e.target.value);
            setCurrentPage(1);
        }
    }

    return (
        <>
            <div className='search-section-container'>
                <div className={context.currentTheme === 'light' ?
                    'search-section-input-container' :
                    'search-section-input-container-dark'} >
                    <SearchIcon />
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
                        <option value='heading'>Filter by Region</option>
                        {regions.map(region => <option value={region} key={region}>{region}</option>)}
                    </select>
                </div>
            </div>
        </>
    )
}

export default FilterDataContainer;
