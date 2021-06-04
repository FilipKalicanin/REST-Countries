import React, { useContext, useState } from 'react';
import FilterDataContainer from './FilterDataContainer';
import Country from './Country';
import Pagination from '../../SharedComponent/Pagination';
import AppStateContext from '../../Reducer&Context/AppStateContext';

function Countries() {
    const [state] = useContext(AppStateContext);
    const { countries } = state;
    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);

    let allCountries = searchInput ?
        countries.filter(country => {
            if (country.name.toLowerCase().includes(searchInput.toLowerCase())) {
                return country
            }
            return null;
        }) :
        countries;

    function paginate(pageNumber) {
        setCurrentPage(pageNumber);
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    allCountries = allCountries.slice(indexOfFirstPost, indexOfLastPost);
    const totalPosts = countries.length;

    return (
        <>
            <FilterDataContainer
            setSearchInput={setSearchInput}
            setCurrentPage={setCurrentPage}
             />
            <div className="all-countries-container">
                {allCountries.map(country => {
                    return (
                        <div className="grid-item" key={country.name}>
                            <Country country={country} key={country.numericCode} />
                        </div>
                    )
                })}
            </div>
            <Pagination
            paginate={paginate}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            totalPosts={totalPosts} />
        </>
    )
}

export default Countries;
