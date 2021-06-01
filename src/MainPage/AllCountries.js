import React, { useState } from 'react';
import FilterDataContainer from './FilterDataContainer';
import Country from './Country';
import Pagination from '../SharedComponent/Pagination';

function Countries({ countries, setSelectedRegion }) {
    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPage, setSelectedPage] = useState(1);
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
        setSelectedPage(pageNumber);
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    allCountries = allCountries.slice(indexOfFirstPost, indexOfLastPost);
    const totalPosts = countries.length;

    return (
        <>
            <FilterDataContainer setSearchInput={setSearchInput} setSelectedRegion={setSelectedRegion} setCurrentPage={setCurrentPage} setSelectedPage={setSelectedPage} />
            <div className="all-countries-container">
                {allCountries.map(country => {
                    return (
                        <div className="grid-item">
                            <Country country={country} key={country.numericCode} />
                        </div>
                    )
                })}
            </div>
            <Pagination paginate={paginate} postsPerPage={postsPerPage} selectedPage={selectedPage} totalPosts={totalPosts} />
        </>
    )
}

export default Countries;
