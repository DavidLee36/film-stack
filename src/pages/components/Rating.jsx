import React, { useState, useEffect } from 'react';
import { getStarRating } from '../../utilities/GetFilterMovieData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStarHalfStroke as halfStar } from '@fortawesome/free-solid-svg-icons';
import '../../styles/ComponentStyles.css';

const Rating = ({ voteAverage, voteCount }) => {
    const [rating, setRating] = useState([]);

    useEffect(() => {
        setRating(getStarRating(voteAverage));
    }, [voteAverage, voteCount]);

    return (
        <div className='rating-container'>
            {voteCount === 0 ? (
                <h3>No movie ratings</h3>
            ) : (
                <>
                    <div className='stars'>
                        {rating && rating.stars && rating.stars.map((star, index) => (
                            <h3 key={index}>
                                {star === 2 ? (
                                    <FontAwesomeIcon icon={solidStar} className='star' />
                                ) : star === 1 ? (
                                    <FontAwesomeIcon icon={halfStar} className='star' />
                                ) : (
                                    <FontAwesomeIcon icon={regularStar} className='star' />
                                )}
                            </h3>
                        ))}
                    </div>
                    <h3>{rating.num}</h3>
                </>
            )}
        </div>
    )
}

export default Rating