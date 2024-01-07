import React, { useState, useEffect } from 'react';
import '../../styles/FilterStyles.css';
import GenreData from '../../utilities/GenreData.json';

const GenreFilter = ({ setGenreInMain }) => {
    const [chosenGenres, setChosenGenre] = useState(['Genres']);

    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                const genreDropdown = document.querySelector('.dropdown-content');
                if (genreDropdown) {
                    genreDropdown.classList.remove('show');
                }
            }
        };

        // Add event listener
        window.addEventListener('keydown', handleEscapeKey);

        // Clean up
        return () => {
            window.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    const handleGenreClick = () => {
        const genreDropdown = document.querySelector('.dropdown-content');
        genreDropdown.classList.toggle('show');
    };

    const handleSelectGenre = (e) => {
        e.target.classList.toggle('selected');
        const options = document.querySelectorAll('.genre-option');
        let genres = [];
        options.forEach((option) => {
            if (option.classList.contains('selected')) {
                genres.push(option.innerHTML);
            }
        });
        setChosenGenre(genres);
        setGenreInMain(genres);
    };

    return (
        <div className="filter-container">
            <div className="dropdown">
                <button className="dropbtn main-btn-style" onClick={handleGenreClick}>Filter Genres</button>
                <div className="dropdown-content">
                    {GenreData.map(genre => (
                        <li key={genre.id} className='genre-option' onClick={handleSelectGenre}>{genre.genre_name}</li>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GenreFilter;
