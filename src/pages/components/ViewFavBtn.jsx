import React from 'react';
import { useNavigate } from 'react-router-dom';

const ViewFavBtn = () => {

    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate('/favorites');
    }

    return (
        <>
            <button className='main-btn-style' onClick={handleOnClick}>
                View Favorites
            </button>
        </>
    )
}

export default ViewFavBtn;