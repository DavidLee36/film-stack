import React, { useState, useEffect } from 'react';
import Providers from './components/Providers';
import Rating from './components/Rating';
import { getMovieCredits, getSingularMovie } from '../utilities/MovieDataCalls';
import '../styles/AdditionalInfo.css';

const MovieInfo = () => {
    const [movie, setMovie] = useState([]);
    const [credits, setCredits] = useState([]);
    const [releaseYear, setReleaseYear] = useState('');

    const setBackground = () => {
        if(movie.backdrop_path !== null && movie.backdrop_path !== undefined) {
            const container = document.querySelector('.heading-container-img');
            container.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${movie.backdrop_path}')`
        }
    }

    useEffect(() => {
        setBackground();
    }, [movie]);

    const getMovieData = async (id) => {
        try {
            const movieInfo = await getSingularMovie(id);
            setMovie(movieInfo);

            const year = movieInfo.release_date.substring(0, 4);
            setReleaseYear(year);

            if (movieInfo.success === false) {
                setMovie([]);
                throw ('movie retrieval = false | most likely 404')
            }
            setBackground(movieInfo);
        } catch (error) {
            console.error('Error fetching movie data: ', error);
        }
    }

    const getCredits = async (id) => {
        try {
            const data = await getMovieCredits(id);
            setCredits(data);
        } catch (error) {
            console.error('Error fetching movie credits: ', error);
        }
    }

    const setMovieData = async () => {
        const movieID = +window.location.hash.slice(1);
        await getMovieData(movieID);
        await getCredits(movieID);
    }

    

    useEffect(() => { //On render
        setMovieData();
    }, []);
    window.addEventListener("hashchange", setMovieData)


    return (
        <div className='additional-info-container'>
            {movie.length === 0 && <h1>Unable to retrieve movie data please try again later</h1>}
            <div className="heading-container-img">
                <div className="heading-container">
                    <div className="heading-img-container">
                        {movie.id && <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="image not found" className='heading-img' />}
                    </div>
                    <div className='main-heading'>
                        <h1>{movie.title}<span>&nbsp;({releaseYear})</span></h1>
                        <h2>{movie.tagline}</h2>
                        <p>{movie.overview}</p>
                        <Rating voteAverage={movie.vote_average} voteCount={movie.vote_count}/>
                    </div>
                </div>
            </div>

            <Providers movieID={movie.id}/>
        </div>
    );
};

export default MovieInfo;