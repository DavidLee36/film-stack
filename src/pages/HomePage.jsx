import React, { useState, useEffect, useRef } from 'react'
import { getMovies, filterMovies, convertResultsForStr } from '../utilities/UtilityFunctions.js';
import DisplayMovies from './components/DisplayMovies.jsx';
import GenreFilter from './components/GenreFilter.jsx';
import FilterRating from './components/FilterRating.jsx';
import DateRangePicker from './components/DateRangePicker.jsx';
import SearchBar from './components/SearchBar.jsx';
import logo from '../assets/images/logo.png';
import DefaultListFilter from './components/DiscoverListFilter.jsx';
import ViewFavBtn from './components/ViewFavBtn.jsx';

import '../styles/HomeStyles.css';

const HomePage = () => {
    const [movies, setMovies] = useState(['shit the bed']);
    const [filteredMovies, setFilteredMovies] = useState(['placeholder']);
    const [genres, setGenres] = useState([]);
    const [dates, setDates] = useState({'startDate':'', 'endDate':''});
    const [rating, setRating] = useState(0);
    const [defaultResults, setDefaultResults] = useState('top_rated');
    const [resultsFor, setResultsFor] = useState('Top Rated');
    const [isLoading, setIsLoading] = useState(false);
    const [resetCurrPage, setResetCurrPage] = useState(false);
    const sidePanelRef = useRef(null);


    useEffect(() => { //On render
        defaultMovieList();
        clearSearchbar(); //ensure search bar is empty and 'x' button is not visible
    }, []);

    const getFilteredMovies = (movieList) => filterMovies(genres, dates, rating, movieList);

    useEffect(() => { //New movie list recieved or filter data changed

        //call function to filter movies based on genres etc.
        setFilteredMovies(getFilteredMovies(movies));
        setResetCurrPage(!resetCurrPage);
    }, [movies, genres, dates, rating]);


    const showLoading = (status) => {
        
        const loadingIcon = document.querySelector('.loader');
        if(status) {
            setFilteredMovies([]);
            loadingIcon.classList.add('show')
            setIsLoading(true);
            return
        }
        loadingIcon.classList.remove('show');
        setIsLoading(false);
    }

    const defaultMovieList = async() => { //Movie call that is default movies displayed
        clearSearchbar();
        showLoading(true);
        const movieData = await getMovies(false, defaultResults, false);
        setMovies(movieData);
        showLoading(false);
    }

    useEffect(() => {
        defaultMovieList();
    }, [defaultResults])

    //Function passed to genre file to change the use state
    const genreChange = (data) => {
        setGenres(data);
    }

    const dateChange = (data) => {
        setDates(data);
    }

    const ratingChange = (data) => {
        setRating(data);
    }
    
    const defaultChange = (defaultSearch) => {
        setDefaultResults(defaultSearch[0]);
        setResultsFor(defaultSearch[1]);
    }

    const handleSearch = async(e) => {
        e.preventDefault();

        showLoading(true);

        const closeBtn = document.querySelector('.clear-search');
        const searchBar = document.querySelector('#search');
        const query = searchBar.value;
        setResultsFor(`results for '${query}'`);

        if (query) {
            const movieData = await getMovies(true, query, 'vote_count', 1);
            setMovies(movieData);

        }else {
            defaultMovieList();
            closeBtn.style.display = 'none' //Remove visibility on 'x' button
        }
        showLoading(false);
    }

    const handleLogoClick = () => { //Clicked on logo
        clearSearchbar();
        defaultMovieList();
        setResultsFor(convertResultsForStr(defaultResults));
    }

    const clearSearchbar = () => {
        const closeBtn = document.querySelector('.clear-search');
        closeBtn.classList.remove('show');
        const searchBar = document.getElementById('search');
        searchBar.value = '';
    }

    //When there is a click anywhere on screen
    const handleMainContainerClick = (e) => {
        //If there is a click not on the filter dropdown make sure it is closed
        if(!e.target.classList.contains('genre-option') && !e.target.classList.contains('dropbtn')) {
            const genreDropdown = document.querySelector('.dropdown-content');
            genreDropdown.classList.remove('show');
        }
    }

    const toggleSidePanel = () => {
        if(sidePanelRef) {
            sidePanelRef.current.classList.toggle('show');
        }
    }

    return (
        <div className='main-container' onClick={handleMainContainerClick}>
            <div className='header'>
                <div className="header-logo-container logo" onClick={handleLogoClick}>
                    <img src={logo} alt="Film Stack"/>
                </div>
                
                <button className="expand-filters-button main-btn-style" onClick={toggleSidePanel}>
                    Filter
                </button>

                <div className="header-view-fav-container">
                    <ViewFavBtn/>
                </div>
                <div className="header-discover-list-container">
                    <DefaultListFilter setDefaultInMain={defaultChange}/>
                </div>
                <SearchBar onSearch={handleSearch} clearSearchbar={clearSearchbar}/>
                <div className="header-genre-filter-container">
                    <GenreFilter setGenreInMain={genreChange}/>
                </div>
                <div className="header-date-filter-container">
                    <DateRangePicker onDateRangeSelected={dateChange}/>
                </div>
                <div className="header-rating-filter-container">
                    <FilterRating onRatingSelected={ratingChange}/>
                </div>
                <h2 className='results-for'>Currently showing: {resultsFor}</h2>
            </div>
            <span className="loader"></span>
            <DisplayMovies movies={filteredMovies} resetSignal={resetCurrPage}/>
            {(filteredMovies.length < 1 && !isLoading) && (
                <h2>No movies found</h2>
            )}

            <div className="side-panel" ref={sidePanelRef}>
                <div className='side-filters-container'>
                    <button className='side-panel-x' onClick={toggleSidePanel}>X</button>
                    <DateRangePicker onDateRangeSelected={dateChange}/>
                    <FilterRating onRatingSelected={ratingChange}/>
                    <GenreFilter setGenreInMain={genreChange}/>
                </div>
            </div>
        </div>
    );
}

export default HomePage