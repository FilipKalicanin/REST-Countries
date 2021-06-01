// import { useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function Pagination({ postsPerPage, totalPosts, paginate, selectedPage }) {
    const pageNumbers = [];
    const context = useContext(ThemeContext);
    // const [page, setPage] = useState(1);

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    // function next() {
    //     setPage(page + 1);
    //     paginate(page);
    // }

    // function prev() {
    //     setPage(page - 1);
    //     paginate(page);
    // }

    return (
        <div className="pagination-wrapper">
            {/* <button onClick={prev}>Prev</button>
            <span>{page}</span>
            <button onClick={next}>Next</button> */}
            <ul className="pagination">
                {pageNumbers.map(number => {
                    return <li className="page-item" key={number}>
                        <div className={selectedPage === number ? 'selected' : 'not-selected'}>
                            <button onClick={() => paginate(number)} className={context.currentTheme === 'light' ? 'page-button' : 'page-button-dark'}>
                                {number}
                            </button>
                        </div>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Pagination;
