import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Providers from './components/Providers';
import Rating from './components/Rating';
import CastSlider from './components/CastSlider';
import { getSingularMovie } from '../utilities/MovieDataCalls';
import '../styles/AdditionalInfo.css';
import { numToDollar, addToFavorites, removeFromFavorites, movieIsFavorited } from '../utilities/UtilityFunctions';
import logo from '../assets/images/logo.png';
import { BASE_IMG_URL } from '../utilities/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import ViewFavBtn from './components/ViewFavBtn';

const MovieInfo = () => {
    const [movie, setMovie] = useState([]);
    const [releaseYear, setReleaseYear] = useState('');
    const [genres, setGenres] = useState([]);
    const [favorited, setFavorited] = useState(false);

    const navigate = useNavigate();

    const setBackground = () => {
        if (movie.backdrop_path !== null && movie.backdrop_path !== undefined) {
            const container = document.querySelector('.heading-container-img');
            container.style.backgroundImage = `url('${BASE_IMG_URL}${movie.backdrop_path}')`
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
        setFavorited(movieIsFavorited(movie.id));
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

    const setMovieData = async () => {
        const movieID = +window.location.hash.slice(1);
        await getMovieData(movieID);
    }

    useEffect(() => { //On render
        setMovieData();
    }, []);
    window.addEventListener("hashchange", setMovieData)

    const handleLogoClick = () => {
        navigate('/');
    }

    const changeFavStatus = () => {
        if(favorited) {
            removeFromFavorites(movie.id);
            setFavorited(false);
        }else {
            addToFavorites(movie);
            setFavorited(true);
        }
    }

    return (
        <div className='movie-info-page-wrapper'>

            <div className="movie-info-header">
                <div className="info-header-logo-container logo" onClick={handleLogoClick}>
                    <img src={logo} alt="Film Stack" />
                </div>
                <div className="info-fav-container">
                        <ViewFavBtn/>
                        <FontAwesomeIcon icon={favorited ? solidStar : regularStar} className='fav-star' onClick={changeFavStatus}/>
                </div>
            </div>
            <div className='additional-info-container'>
                {movie.length === 0 && <h1>Unable to retrieve movie data please try again later</h1>}


                {/* BACKDROP WITH POSTER, TITLE etc. */}
                <div className="heading-container-img">
                    <div className="heading-container">
                        <div className="heading-img-container">
                            {movie.id && <img src={`${BASE_IMG_URL}${movie.poster_path}`} alt="image not found" className='heading-img' />}
                        </div>
                        <div className='main-heading'>
                            <h1>{movie.title}<span>&nbsp;({releaseYear})</span></h1>
                            <h2>{movie.tagline}</h2>
                            <p>{movie.overview}</p>
                            <Rating voteAverage={movie.vote_average} voteCount={movie.vote_count} />
                        </div>
                    </div>
                </div>

                {/* Poster to show up once the screen is too small to support the one in the heading */}
                {movie.id && <img src={`${BASE_IMG_URL}${movie.poster_path}`} alt="image not found" className='secondary-img' />}

                <div className="info-cast-container info-card">
                    <h1>Top Billed Cast:</h1>
                    <CastSlider movieID={movie.id} />
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
                            <h3 key={index}>
                                {genre.name}
                                {index < genres.length - 1 && (<>,&nbsp;&nbsp;</>)}
                            </h3>
                        ))}
                    </div>
                </div>

                <div className="release-date-container info-card">
                    <div className="release-date">
                        <h2>Release Date:&nbsp;&nbsp;</h2>
                        {movie.release_date ? (<h3>{movie.release_date}</h3>) : (<h3>unkown</h3>)}
                    </div>
                    <div className="release-status">
                        <h2>Status:&nbsp;&nbsp;</h2>
                        {movie.status ? (<h3>{movie.status}</h3>) : (<h3>unkown</h3>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieInfo;