import React, { useState, useEffect } from 'react';
import '../../styles/FilterStyles.css';

const DiscoverListFilter = ({ setDefaultInMain }) => {
    const [defaultTerm, setDefaultTerm] = useState('top_rated')

    const possibleSearches = [
        {
            term: "top_rated",
            display: "Top Rated"
        },
        {
            term: "now_playing",
            display: "Now Playing"
        },
        {
            term: "popular",
            display: "Popular"
        },
        {
            term: "upcoming",
            display: "Upcoming"
        }
    ];

    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                const discoverDropdown = document.querySelector('.discover-dropdown');
                if (discoverDropdown) {
                    discoverDropdown.classList.remove('show');
                }
            }
        };

        const handleWindowClick = (e) => {
            if(!e.target.classList.contains('discover-dropbtn') &&
            !e.target.classList.contains('discover-dropdown') &&
            !e.target.classList.contains('discover-option')) {
                const discoverDropdown = document.querySelector('.discover-dropdown');
                if (discoverDropdown) {
                    discoverDropdown.classList.remove('showdoesntfuckingwork');
                }
            }
        }

        // Add event listener
        window.addEventListener('keydown', handleEscapeKey);
        window.addEventListener('click', handleWindowClick);

        // Clean up
        return () => {
            window.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    const handlediscoversClick = () => {
        const discoverDropdown = document.querySelector('.discover-dropdown');
        discoverDropdown.classList.toggle('showdoesntfuckingwork');
    };

    const handleSelectdiscover = (e) => {
        const options = document.querySelectorAll('.discover-option');
        options.forEach((option) => {
            if (option.classList.contains('selected')) {
                option.classList.remove('selected')
            }
        });
        e.target.classList.add('selected');
        const idx = e.target.getAttribute('data-index');
        const selectedTerm = possibleSearches[idx].term;
        const selectedDisplay = possibleSearches[idx].display;
        if(selectedTerm !== defaultTerm) {
            setDefaultTerm(selectedTerm);
            setDefaultInMain([selectedTerm, selectedDisplay]);
        }
    };

    return (
        <>
            <div className="dropdown">
                <button className="discover-dropbtn main-btn-style" onClick={handlediscoversClick}>Discover</button>
                <div className="discover-dropdown dropdown-content">
                    {possibleSearches.map((search, idx) => (
                        <li key={idx} data-index={idx} className='discover-option' onClick={handleSelectdiscover}>{search.display}</li>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DiscoverListFilter;
