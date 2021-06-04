import { useContext } from 'react';
import { ThemeContext } from '../Reducer&Context/ThemeContext';

function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
    const pageNumbers = [];
    const context = useContext(ThemeContext);

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-wrapper">
            {pageNumbers.map(number => {
                return (
                    <div className={currentPage === number ? 'selected' : 'not-selected'} key={number}>
                        <button onClick={() => paginate(number)}
                            className={context.currentTheme === 'light' ?
                                'page-button' :
                                'page-button-dark'} >
                            {number}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default Pagination;
