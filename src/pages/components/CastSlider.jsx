import React, { useState, useEffect } from 'react';
import { getMovieCredits } from '../../utilities/MovieDataCalls';
import { CAST_NUM, BASE_IMG_URL, BASE_CAST_MEMBER_URL } from '../../utilities/config';
import '../../styles/CastSliderStyles.css';

const CastSlider = ({ movieID }) => {
    const [cast, setCast] = useState([]);

    const getCredits = async (id) => {
        try {
            const data = await getMovieCredits(id);
            const actors = data.slice(0, CAST_NUM);
            setCast(actors);
            console.log(actors)
        } catch (error) {
            console.error('Error fetching movie credits: ', error);
        }
    }

    useEffect(() => {
        if (movieID) {
            getCredits(movieID);
        }
    }, [movieID])

    const scrollLeft = () => {
        document.querySelector('.cast-slider').scrollBy({
            left: -200, // Or the width of one card
            behavior: 'smooth'
        });
    };

    const scrollRight = () => {
        document.querySelector('.cast-slider').scrollBy({
            left: 200, // Or the width of one card
            behavior: 'smooth'
        });
    };

    //On member click, open their TMDB page
    const memberClick = (member) => {
        let name = member.name.replace(' ', '-');
        name = name.toLowerCase();
        const url = `${BASE_CAST_MEMBER_URL}${member.id}-${name}`;
        window.open(url, '_blank');
    }

    return (
        <div className='cast-slider-container'>
            <button className="slide-btn left" onClick={() => scrollLeft()}>{"<"}</button>
            <div className="cast-slider">
                {cast.map(member => (
                    <div key={member.id} className="cast-card" onClick={() => memberClick(member)}>
                        <img src={`${BASE_IMG_URL}${member.profile_path}`} alt={member.name} className="cast-image" />
                        <h3 className="cast-name">{member.name}</h3>
                        <p className="cast-character">{member.character}</p>
                    </div>
                ))}
            </div>
            <button className="slide-btn right" onClick={() => scrollRight()}>{">"}</button>
        </div>
    )
}

export default CastSlider