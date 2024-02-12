import React, { useState, useEffect } from 'react';
import { getFavoriteMovies } from '../utilities/UtilityFunctions';
import DisplayMovies from './components/DisplayMovies';
import logo from '../assets/images/logo.png';
import '../styles/FavoritesStyles.css';
import { useNavigate } from 'react-router-dom';


const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [numFavorites, setNumFavorites] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const favMovies = getFavoriteMovies();
        setFavorites(favMovies);
        setNumFavorites(favMovies.length);
    }, []);

    const handleLogoClick = () => {
        navigate('/');
    }

    return (
        <div className='favorites-page-wrapper'>
            <div className="fav-page-header">
                <img src={logo} alt="Film Stack" className='fav-header-logo logo' onClick={handleLogoClick}/>
                <h1>You have {numFavorites} favorite movies</h1>
            </div>
            <DisplayMovies movies={favorites}/>
        </div>
    )
}

export default FavoritesPage