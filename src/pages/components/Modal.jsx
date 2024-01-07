import React from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from './Rating.jsx';
import Providers from './Providers.jsx';
import '../../styles/ModalStyles.css';


const Modal = ({ movie, onClose }) => {

    const navigate = useNavigate();

    const handleMoreInfo = () => {
        navigate(`/additional-info#${movie.id}`, { state: { movie } });
    }

    return (
        <div className='modal-overlay' onClick={(e) => e.target.classList.contains('modal-overlay') && onClose()}>
            <div className="modal-container">
                <div className="image-container">
                    {movie.backdrop_path !== null ?
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="image not found" className='modal-backdrop' /> :
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="image not found" className='modal-backdrop' />
                    }
                </div>
                <div className='title-container'>
                    <h1 id='modal-title'>{movie.title}</h1>
                </div>
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

export default Modal