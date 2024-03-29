import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from './Rating.jsx';
import Providers from './Providers.jsx';
import '../../styles/ModalStyles.css';
import { BASE_IMG_URL } from '../../utilities/config.js';
import { movieIsFavorited, addToFavorites, removeFromFavorites } from '../../utilities/UtilityFunctions.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const Modal = ({ movie, onClose }) => {
    const [favorited, setFavorited] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setFavorited(movieIsFavorited(movie.id));
    }, [movie]);

    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeAndNavigate();
        }
    }

    const closeAndNavigate = () => {
        // If on favorites page, refresh
        if (window.location.pathname.includes('/favorites')) {
            navigate('/favorites');
        }
        onClose();
    }

    useEffect(() => {
        window.addEventListener('keydown', handleEscape);
        window.history.pushState(null, null, window.location.href); // Push new state into history when modal opens
        const handlePopState = () => {
            closeAndNavigate();
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('keydown', handleEscape);
            window.removeEventListener('popstate', handlePopState);
            window.history.go(1); // Move forward in history stack if modal is closed to prevent back action from reopening it
        };
    }, []);

    const handleMoreInfo = () => {
        navigate(`/additional-info#${movie.id}`, { state: { movie } });
    }

    const changeFavStatus = () => {
        if (favorited) {
            removeFromFavorites(movie.id);
            setFavorited(false);
        } else {
            addToFavorites(movie);
            setFavorited(true);
        }
    }

    return (
        <div className='modal-overlay' onClick={(e) => e.target.classList.contains('modal-overlay') && onClose()}>
            <div className="modal-container">
            <div className="image-container">
                    {movie.backdrop_path !== null ?
                        <img src={`${BASE_IMG_URL}${movie.backdrop_path}`} alt="image not found" className='modal-backdrop' /> :
                        <img src={`${BASE_IMG_URL}${movie.poster_path}`} alt="image not found" className='modal-poster' />
                    }
                </div>
                <div className='title-container'>
                    <h1 id='modal-title'>{movie.title}</h1>
                </div>
                <div className="modal-fav-container">
                    <h3>
                        <FontAwesomeIcon icon={favorited ? solidStar : regularStar} className='modal-fav-star' onClick={changeFavStatus}/>
                    </h3>
                </div>
                <button className="modal-exit-btn" onClick={onClose}>
                    X
                </button>
                <div className='overview-container'>
                    <p id="modal-overview">{movie.overview}</p>
                </div>
                <div className='modal-rating-container'>
                    <Rating voteAverage={movie.vote_average} voteCount={movie.vote_count}/>
                </div>
                
                
                <button className='additional-info main-btn-style' onClick={handleMoreInfo}>Additional Movie Info</button>

                <div className='modal-provider-container'>
                    <Providers movieID={movie.id}/>
                </div>
            </div>
        </div>
    )
}

export default Modal;
