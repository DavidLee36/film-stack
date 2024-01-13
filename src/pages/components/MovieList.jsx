import React from 'react';
import '../../styles/HomeStyles.css';

const MovieList = ({ movies, handleMovieClick }) => {
    return (
        <div className='movies-list'>
            {movies.map((movie, index) => (
                <div key={index} onClick={() => handleMovieClick(movie)} className='movie-item'>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className='movie-image' />
                    <h2 className='movie-title'>{movie.title}</h2>
                </div>
            ))}
        </div>
    );
}

export default MovieList;
