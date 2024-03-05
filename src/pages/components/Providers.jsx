import React, { useState, useEffect } from 'react';
import { getAndFilterProviders } from '../../utilities/UtilityFunctions';
import '../../styles/ComponentStyles.css';
import ProviderData from '../../utilities/ProviderData.json'

const Providers = ({ movieID }) => {
    const [providers, setProviders] = useState([]);
    const [allProvidersLink, setAllProvidersLink] = useState("");
    const [btnText, setBtnText] = useState('View all providers');


    useEffect(() => {
        // Define the function to update the state based on screen width
        const updateTextBasedOnScreenWidth = () => {
          if (window.matchMedia("(max-width: 60em)").matches) {
            setBtnText("View more"); // Screen width is below 60em
          } else {
            setBtnText("View all providers"); // Screen width is above 60em
          }
        };
    
        // Call the function initially and whenever the screen size changes
        updateTextBasedOnScreenWidth();
        window.addEventListener('resize', updateTextBasedOnScreenWidth);
    
        // Cleanup function to remove the event listener
        return () => window.removeEventListener('resize', updateTextBasedOnScreenWidth);
      }, []);

    useEffect(() => {
        const fetchData = async() => {
            const providerReturnData = await getAndFilterProviders(movieID);
            if(providerReturnData) {
                setProviders(providerReturnData.providers);
                setAllProvidersLink(providerReturnData.link);
            }
        }
        if(movieID) { //Make sure movieID exists before fetching data
            fetchData();
        }
    }, [movieID]);

    const providerClick = (id) => { //Open the provider link on a new tab
        const currProvider = ProviderData.find(provider => provider.provider_id === id);
        console.log(currProvider)
        window.open(currProvider.url, '_blank');
    }

    const viewAllProviders = () => {
        window.open(allProvidersLink, '_blank');
    }

    return (
        <div className='providers-container'>
            <h2>Available On:</h2>
            <div className="providers-list">
                {providers.length === 0 ? (
                    <h2>No movie provider data found</h2>
                ) : (
                    providers.map((provider, index) => (
                        <img src={`https://image.tmdb.org/t/p/w500/${provider.logo_path}`}
                            className='provider-logo'
                            onClick={() => providerClick(provider.provider_id)} key={index} />
                    ))
                )}
            </div>
            {providers.length !== 0 &&
                <button onClick={viewAllProviders} className='main-btn-style'>{btnText}</button>
            }
        </div>
    )
}

export default Providers