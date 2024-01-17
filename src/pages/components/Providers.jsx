import React, { useState, useEffect } from 'react';
import { getAndFilterProviders } from '../../utilities/UtilityFunctions';
import '../../styles/ComponentStyles.css';

const Providers = ({ movieID }) => {
    const [providers, setProviders] = useState([]);
    const [allProvidersLink, setAllProvidersLink] = useState("");

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
                <button onClick={viewAllProviders} className='main-btn-style'>View full list of providers</button>
            }
        </div>
    )
}

export default Providers