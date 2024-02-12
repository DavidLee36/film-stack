import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../../styles/HomeStyles.css';

const SearchBar = ({ onSearch, clearSearchbar }) => {

    const onSearchChange = (e) => { //Search bar change
        const closeBtn = document.querySelector('.clear-search');
        if (e.target.value) {
            closeBtn.classList.add('show'); //Make 'x' button visible
        }
        else {
            closeBtn.classList.remove('show'); //Remove visibility on 'x' button
        }
    }

    return (
        <form className="search-container" onSubmit={onSearch}>
            <div className="search-input-container">
                <input type="text" name="search" id="search" placeholder='Search...' onChange={onSearchChange} />
                <button type='button' onClick={clearSearchbar} className='clear-search'>X</button>
            </div>

            <button type='submit' id='search-icon'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </form>
    );
};

export default SearchBar;
