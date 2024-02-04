import React, { useState, useEffect } from 'react';
import '../../styles/FilterStyles.css';

const DiscoverListFilter = ({ setDefaultInMain }) => {
    const [defaultTerm, setDefaultTerm] = useState('top_rated')

    const possibleSearches = [
        {
            term: "top_rated",
            display: "Top Rated"
        },
        {
            term: "now_playing",
            display: "Now Playing"
        },
        {
            term: "popular",
            display: "Popular"
        },
        {
            term: "upcoming",
            display: "Upcoming"
        }
    ];

    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                const movieDropdown = document.querySelector('.movie-dropdown');
                if (movieDropdown) {
                    movieDropdown.classList.remove('show');
                }
            }
        };

        const handleWindowClick = (e) => {
            if(!e.target.classList.contains('movie-dropbtn') &&
            !e.target.classList.contains('movie-dropdown') &&
            !e.target.classList.contains('movie-option')) {
                const movieDropdown = document.querySelector('.movie-dropdown');
                if (movieDropdown) {
                    movieDropdown.classList.remove('showdoesntfuckingwork');
                }
            }
        }

        // Add event listener
        window.addEventListener('keydown', handleEscapeKey);
        window.addEventListener('click', handleWindowClick);

        // Clean up
        return () => {
            window.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    const handleMoviesClick = () => {
        const movieDropdown = document.querySelector('.movie-dropdown');
        movieDropdown.classList.toggle('showdoesntfuckingwork');
    };

    const handleSelectMovie = (e) => {
        const options = document.querySelectorAll('.movie-option');
        options.forEach((option) => {
            if (option.classList.contains('selected')) {
                option.classList.remove('selected')
            }
        });
        e.target.classList.add('selected');
        const idx = e.target.getAttribute('data-index');
        const selectedTerm = possibleSearches[idx].term;
        const selectedDisplay = possibleSearches[idx].display;
        if(selectedTerm !== defaultTerm) {
            setDefaultTerm(selectedTerm);
            setDefaultInMain([selectedTerm, selectedDisplay]);
        }
    };

    return (
        <div className="filter-container">
            <div className="dropdown">
                <button className="movie-dropbtn main-btn-style" onClick={handleMoviesClick}>Discover</button>
                <div className="movie-dropdown dropdown-content">
                    {possibleSearches.map((search, idx) => (
                        <li key={idx} data-index={idx} className='movie-option' onClick={handleSelectMovie}>{search.display}</li>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DiscoverListFilter;
