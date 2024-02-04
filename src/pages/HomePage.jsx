import React, { useState, useEffect } from 'react'
import { getMovies, filterMovies, convertResultsForStr } from '../utilities/UtilityFunctions.js';
import Modal from './components/Modal.jsx';
import MovieList from './components/MovieList.jsx';
import GenreFilter from './components/GenreFilter.jsx';
import SearchBar from './components/SearchBar.jsx';
import logo from '../assets/images/logo.png';
import DefaultListFilter from './components/DiscoverListFilter.jsx';

import { PAGE_SIZE } from '../utilities/config.js';

import '../styles/HomeStyles.css';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState(['placeholder']);
    const [displayMovies, setDisplayMovies] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [genres, setGenres] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [defaultResults, setDefaultResults] = useState('top_rated');
    const [resultsFor, setResultsFor] = useState('Top Rated');


    useEffect(() => { //On render
        defaultMovieList();
        clearSearchbar(); //ensure search bar is empty and 'x' button is not visible
    }, []);

    const getFilteredMovies = (movieList) => filterMovies(genres, [], [], movieList);

    useEffect(() => { //New movie list recieved or filter data changed

        //call function to filter movies based on genres etc.
        setFilteredMovies(getFilteredMovies(movies));
        setDisplayMovies(getFilteredMovies(movies))
        setCurrPage(1);
    }, [movies, genres]);

    //handleCurrPage changing iff filteredMovies is populated
    useEffect(() => {
        if(filteredMovies.length > 0) {
            //calculate indexes for page content
            const offset = (currPage-1) * PAGE_SIZE;
            const beginning = offset;
            const ending = offset + PAGE_SIZE;

            setDisplayMovies(filteredMovies.slice(beginning, ending))
        }
    }, [currPage, filteredMovies])

    //Handle Esc press to close modal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    })

    //Toggle 'modal-active' class on body when modal open or closed, currently not in use
    useEffect(() => {
        if (modalActive) {
            document.body.classList.toggle('modal-active');
        }
    }, [modalActive]);

    const closeModal = () => { //Close the modal
        setModalActive(false);
        document.body.classList.remove('modal-active');
    }

    const showLoading = (status) => {
        const loadingIcon = document.querySelector('.loader');
        if(status) {
            setDisplayMovies([]); //Empty displayed movies to only show spinner
            loadingIcon.classList.add('show')
            return
        }
        loadingIcon.classList.remove('show');
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

    //Clicked on movie preview: Open modal
    const handleMovieClick = (movie) => {
        setModalActive(true);
        setSelectedMovie(movie);
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

    //When the user clicks to go on previous or next page
    const handlePaginationBtnClick = async(e) => {
        const btn = e.target;
        let nextView = currPage;
        btn.classList.contains('pag-next') ? nextView++ : nextView--;
        setCurrPage(nextView);
    }

    return (
        <div className='main-container' onClick={handleMainContainerClick}>
            <div className='header'>
                <div className="header-logo-container" onClick={handleLogoClick}>
                    <img src={logo} alt="Film Stack"/>
                </div>
                <div className="header-discover-list-container">
                    <DefaultListFilter setDefaultInMain={defaultChange}/>
                </div>
                <SearchBar onSearch={handleSearch} clearSearchbar={clearSearchbar}/>
                <div className="header-genre-filter-container">
                    <GenreFilter setGenreInMain={genreChange}/>
                </div>
                <h2 className='results-for'>Currently showing: {resultsFor}</h2>
            </div>
            <span className="loader"></span>
            {(displayMovies.length > 0 || filteredMovies.length > 0) ? (
                <MovieList movies={displayMovies} handleMovieClick={handleMovieClick}/>
            ) : (
                <h2 id='none-found'>No movies found</h2>
            )}
            {modalActive && (
                <Modal movie={selectedMovie} onClose={() => closeModal()} />
            )}
            <div className="pagination">
                {currPage > 1 &&
                    <button className='pag-prev main-btn-style' onClick={handlePaginationBtnClick}>
                        Page {currPage-1}
                    </button>}
                {(filteredMovies.length / PAGE_SIZE > currPage && displayMovies.length > 0) && 
                    <button className='pag-next main-btn-style' onClick={handlePaginationBtnClick}>
                        Page {currPage+1}
                    </button>
                }
            </div>
        </div>
    );
}

export default HomePage