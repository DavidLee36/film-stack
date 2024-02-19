import React, { useState, useEffect } from 'react';
import '../../styles/FilterStyles.css';
import GenreData from '../../utilities/GenreData.json';

const GenreFilter = ({ setGenreInMain }) => {
    const [chosenGenres, setChosenGenre] = useState(['Genres']);

    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                const genreDropdown = document.querySelector('.genre-dropdown');
                if (genreDropdown) {
                    genreDropdown.classList.remove('showdoesntfuckingwork');
                }
            }
        };

        const handleWindowClick = (e) => {
            if(!e.target.classList.contains('genre-dropbtn') &&
            !e.target.classList.contains('genre-dropdown') &&
            !e.target.classList.contains('genre-option')) {
                const genreDropdown = document.querySelector('.genre-dropdown');
                if (genreDropdown) {
                    genreDropdown.classList.remove('showdoesntfuckingwork');
                }
            }
        }

        // Add event listener
        window.addEventListener('keydown', handleEscapeKey);
        window.addEventListener('click', handleWindowClick);

        // Clean up
        return () => {
            window.removeEventListener('keydown', handleEscapeKey);
            window.removeEventListener('click', handleWindowClick);
        };
    }, []);

    const handleGenreClick = () => {
        const genreDropdown = document.querySelector('.genre-dropdown');
        genreDropdown.classList.toggle('showdoesntfuckingwork');
    };

    const handleSelectGenre = (e) => {
        e.target.classList.toggle('selected');
        const btn = document.querySelector('.genre-dropbtn');
        const options = document.querySelectorAll('.genre-option');
        let genres = [];
        options.forEach((option) => {
            if (option.classList.contains('selected')) {
                genres.push(option.innerHTML);
            }
        });
        if(genres.length > 0) {
            btn.classList.add('filter-btn-active');
        }else {
            btn.classList.remove('filter-btn-active');
        }
        setChosenGenre(genres);
        setGenreInMain(genres);
    };

    return (
        <div className="filter-container">
            <div className="dropdown">
                <button className="genre-dropbtn main-btn-style" onClick={handleGenreClick}>Filter Genres</button>
                <div className="dropdown-content genre-dropdown">
                    {GenreData.map(genre => (
                        <li key={genre.id} className='genre-option' onClick={handleSelectGenre}>{genre.genre_name}</li>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GenreFilter;
