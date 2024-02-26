import React, { useState, useEffect } from 'react';
import '../../styles/FilterStyles.css';
import GenreData from '../../utilities/GenreData.json';

const GenreFilter = ({ setGenreInMain }) => {
    const [chosenGenres, setChosenGenre] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                setIsVisible(false);
            }
        };

        const handleWindowClick = (e) => {
            if (!e.target.classList.contains('genre-dropbtn') &&
                !e.target.closest('.genre-dropdown')) {
                setIsVisible(false);
            }
        };

        // Add event listener
        window.addEventListener('keydown', handleEscapeKey);
        window.addEventListener('click', handleWindowClick);

        // Clean up
        return () => {
            window.removeEventListener('keydown', handleEscapeKey);
            window.removeEventListener('click', handleWindowClick);
        };
    }, []);

    const handleSelectGenre = (genre) => {
        const isSelected = chosenGenres.includes(genre);
        setChosenGenre(prevGenres =>
            isSelected
                ? prevGenres.filter(g => g !== genre)
                : [...prevGenres, genre]
        );
    };

    useEffect(() => {
        console.log('stinky')
        setGenreInMain(chosenGenres);
    }, [chosenGenres]);

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsVisible(!isVisible);
    };

    // Dynamically assign button class based on if any genres are chosen
    const buttonClass = `genre-dropbtn main-btn-style ${chosenGenres.length > 0 ? 'filter-btn-active' : ''}`;

    return (
        <div className="filter-wrapper">
            <button className={buttonClass} onClick={toggleDropdown}>Filter Genres</button>
            {isVisible && (
                <div className="dropdown-content genre-dropdown">
                    {GenreData.map(genre => (
                        <li key={genre.id} 
                            className={`genre-option ${chosenGenres.includes(genre.genre_name) ? 'selected' : ''}`} 
                            onClick={() => handleSelectGenre(genre.genre_name)}>
                            {genre.genre_name}
                        </li>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GenreFilter;
