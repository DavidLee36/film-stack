import React from 'react';
import '../../styles/HomeStyles.css';
import { BASE_IMG_URL } from '../../utilities/config';

const MovieList = ({ movies, handleMovieClick }) => {
    return (
        <div className='movies-list'>
            {movies.map((movie, index) => (
                <div key={index} onClick={() => handleMovieClick(movie)} className='movie-item'>
                    <img src={`${BASE_IMG_URL}${movie.poster_path}`} alt={movie.title} className='movie-image' />
                    <h2 className='movie-title'>{movie.title}</h2>
                </div>
            ))}
        </div>
    );
}

export default MovieList;
