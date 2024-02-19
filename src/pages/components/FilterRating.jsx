import React, { useState, useEffect, useRef } from 'react';
import '../../styles/FilterStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStarHalfStroke as halfStar } from '@fortawesome/free-solid-svg-icons';

const FilterRating = ({ onRatingSelected }) => {
    const defaultRating = [0, 0, 0, 0, 0];
    const [isVisible, setIsVisible] = useState(false);
    const [selectedRating, setSelectedRating] = useState(defaultRating);
    const [ratingOutOfFive, setRatingOutOfFive] = useState(0);

    //Used to revert dropdown UI to last applied rating when closing dropdown via click or escape key
    const [appliedRating, setAppliedRating] = useState(defaultRating);
    const [appliedOutOfFive, setAppliedOutOfFive] = useState(0);

    const dropdownRef = useRef(null); // Ref for the dropdown

    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                setIsVisible(false);
                setSelectedRating(appliedRating);
                setRatingOutOfFive(appliedOutOfFive);
            }
        };

        // Function to handle clicks outside the dropdown
        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !e.target.matches('.rating-filter-btn')) {
                setIsVisible(false);
                setSelectedRating(appliedRating);
                setRatingOutOfFive(appliedOutOfFive);
            }
        };

        // Add event listeners if the dropdown is visible
        if (isVisible) {
            document.addEventListener('keydown', handleEscapeKey);
            document.addEventListener('mousedown', handleOutsideClick);
        }

        // Cleanup function to remove event listeners
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isVisible]);

    const handleStarClick = (e, index) => {
        const starRect = e.target.getBoundingClientRect();
        const clickX = e.clientX;
        const starWidth = starRect.right - starRect.left;
        const clickPosition = clickX - starRect.left;

        // Assuming each star represents a full point and half-point for the left side.
        let rating = index + 1; // Full star rating
        if (clickPosition < (starWidth / 2)) {
            rating -= 0.5; // Adjust for half-star if click is on the left half
        }
        setRatingOutOfFive(rating);

        const ratingArr = defaultRating;

        const solid = Math.floor(rating);
        for (let i = 0; i < solid; i++) {
            ratingArr[i] = 2;
        }
        if (solid !== rating) {
            ratingArr[solid] = 1;
        }
        setSelectedRating(ratingArr);
    }

    const onApply = () => {

        setAppliedOutOfFive(ratingOutOfFive);
        setAppliedRating(selectedRating);

        setIsVisible(false);
        onRatingSelected(ratingOutOfFive);
        const btn = document.querySelector('.rating-filter-btn');
        if(ratingOutOfFive > 0) {
            btn.classList.add('filter-btn-active');
        }else {
            btn.classList.remove('filter-btn-active');
        }
    };

    const onClear = () => {
        setSelectedRating(defaultRating);
        setRatingOutOfFive(0);
        setAppliedOutOfFive(0);
        setAppliedRating(defaultRating);
        setIsVisible(false);
        onRatingSelected(0);
        const btn = document.querySelector('.rating-filter-btn');
        btn.classList.remove('filter-btn-active');
    };

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsVisible(!isVisible)
    }

    return (
        <div>
            <button onClick={toggleDropdown} className='main-btn-style rating-filter-btn'>
                Filter Rating
            </button>
            {isVisible && (
                <div className="rating-picker-container" ref={dropdownRef}>
                    <h3>Show movies rated {ratingOutOfFive} or higher</h3>
                    <div className="rating-picker-stars">
                        {selectedRating.map((star, index) => (
                            <h3 key={index} onClick={(e) => handleStarClick(e, index)}>
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
                    <div className="filter-footer-btns">
                        <button className="apply-filter-btn" onClick={onClear}>Clear</button>
                        <button className='apply-filter-btn' onClick={onApply}>Apply</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterRating;
