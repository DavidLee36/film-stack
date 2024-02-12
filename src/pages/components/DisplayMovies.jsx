import React, { useEffect, useState } from 'react';
import MovieList from './MovieList';
import Modal from '../components/Modal.jsx';
import { PAGE_SIZE } from '../../utilities/config.js';
import '../../styles/HomeStyles.css';

const DisplayMovies = ({ movies }) => {
    const [displayMovies, setDisplayMovies] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [modalActive, setModalActive] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);



    //handleCurrPage changing iff movies is populated
    useEffect(() => {
        if(movies.length > 0) {
            //calculate indexes for page content
            const offset = (currPage-1) * PAGE_SIZE;
            const beginning = offset;
            const ending = offset + PAGE_SIZE;

            setDisplayMovies(movies.slice(beginning, ending))
        }else {
            setDisplayMovies([])
        }
    }, [currPage, movies]);

    //Clicked on movie preview: Open modal
    const handleMovieClick = (movie) => {
        setModalActive(true);
        setSelectedMovie(movie);
    }

    //When the user clicks to go on previous or next page
    const handlePaginationBtnClick = async(e) => {
        const btn = e.target;
        let nextView = currPage;
        btn.classList.contains('pag-next') ? nextView++ : nextView--;
        setCurrPage(nextView);
    }

    const closeModal = () => { //Close the modal
        setModalActive(false);
        if(window.location.pathname.includes('/favorites')) {
            console.log('pog')
            window.location.reload();
        }
    }


    return (
        <>
            <MovieList movies={displayMovies} handleMovieClick={handleMovieClick} />

            {modalActive && (
                <Modal movie={selectedMovie} onClose={() => closeModal()} />
            )}
            <div className="pagination">
                {currPage > 1 &&
                    <button className='pag-prev main-btn-style' onClick={handlePaginationBtnClick}>
                        Page {currPage - 1}
                    </button>}
                {(movies.length / PAGE_SIZE > currPage && displayMovies.length > 0) &&
                    <button className='pag-next main-btn-style' onClick={handlePaginationBtnClick}>
                        Page {currPage + 1}
                    </button>
                }
            </div>
        </>
    )
}

export default DisplayMovies