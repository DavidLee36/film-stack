import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Providers from './components/Providers';
import Rating from './components/Rating';
import { getMovieCredits, getSingularMovie } from '../utilities/MovieDataCalls';
import '../styles/AdditionalInfo.css';
import { numToDollar } from '../utilities/UtilityFunctions';
import logo from '../assets/images/logo.png';

const MovieInfo = () => {
    const [movie, setMovie] = useState([]);
    const [credits, setCredits] = useState([]);
    const [releaseYear, setReleaseYear] = useState('');
    const [genres, setGenres] = useState([]);

    const navigate = useNavigate();

    const setBackground = () => {
        if (movie.backdrop_path !== null && movie.backdrop_path !== undefined) {
            const container = document.querySelector('.heading-container-img');
            container.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${movie.backdrop_path}')`
        }
    }

    const calcRuntime = () => {
        if (movie.runtime) {
            const hours = Math.floor(movie.runtime / 60);
            const minutes = movie.runtime % 60;
            return `${hours}h ${minutes}m`;
        }
        return 'unknown';
    }

    const calcBudgetRevenue = (budgetOrRevenue) => {
        if (budgetOrRevenue === 'budget') {
            if (movie.budget) {
                return (numToDollar(movie.budget));
            }
        } else {
            if (movie.revenue) {
                return (numToDollar(movie.revenue));
            }
        }
        return 'unkown';
    }

    useEffect(() => {
        setBackground();
    }, [movie]);

    const getMovieData = async (id) => {
        try {
            const movieInfo = await getSingularMovie(id);
            console.log(movieInfo)
            setMovie(movieInfo);
            setGenres(movieInfo.genres);
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

    const handleLogoClick = () => {
        navigate('/');
    }


    return (
        <>
            <div className="home-btn-container">
                <div className="logo" onClick={handleLogoClick}>
                    <img src={logo} alt="Film Stack"  />
                    {/* <h1>Film Stack</h1> */}
                </div>
            </div>
            <div className='additional-info-container'>
                {movie.length === 0 && <h1>Unable to retrieve movie data please try again later</h1>}


                {/* BACKDROP WITH POSTER, TITLE etc. */}
                <div className="heading-container-img">
                    <div className="heading-container">
                        <div className="heading-img-container">
                            {movie.id && <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="image not found" className='heading-img' />}
                        </div>
                        <div className='main-heading'>
                            <h1>{movie.title}<span>&nbsp;({releaseYear})</span></h1>
                            <h2>{movie.tagline}</h2>
                            <p>{movie.overview}</p>
                            <Rating voteAverage={movie.vote_average} voteCount={movie.vote_count} />
                        </div>
                    </div>
                </div>

                <div className="info-card info-providers-container">
                    <Providers movieID={movie.id} />
                </div>

                <div className='rt-budget-container info-card'>
                    <div className="rt">
                        <h2>Runtime:&nbsp;&nbsp;</h2>
                        <h3>{calcRuntime()}</h3>
                    </div>
                    <div className="budget">
                        <h2>Budget:&nbsp;</h2>
                        <h3>{calcBudgetRevenue('budget')}</h3>
                    </div>
                    <div className="revenue">
                        <h2>Revenue:&nbsp;</h2>
                        <h3>{calcBudgetRevenue('revenue')}</h3>
                    </div>
                </div>

                <div className='genre-container info-card'>
                    <h2>Genres:</h2>
                    <div className="genres-list">
                        {genres.map((genre, index) => (
                            <h2 key={index}>
                                {genre.name}
                                {index < genres.length - 1 && (<>,&nbsp;&nbsp;</>)}
                            </h2>
                        ))}
                    </div>
                </div>

                <div className="release-date-container info-card">
                    <h2>Release date: {movie.release_date ? (<>{movie.release_date}</>) : (<>unkown</>)}</h2>
                    <h2>Status: {movie.status ? (<>{movie.status}</>) : (<>unkown</>)}</h2>
                </div>

            </div>
        </>

    );
};

export default MovieInfo;