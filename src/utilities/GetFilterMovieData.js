import { getMoviesByParam, searchMovies, getWatchProviders } from './MovieDataCalls';
import GenreData from './GenreData.json';
import ProviderData from '../utilities/ProviderData.json';

//Search{bool: call searchMovies}
//value{string: search value OR getMoviesByParam paramm ie. 'top_rated'}
//sort{bool: sort the data}
const getMovies = async (search, value, sort) => {
    try {
        let movieData = search ? await searchMovies(value) : await getMoviesByParam(value);

        movieData = movieData.filter((movie) => movie.poster_path !== null && movie.poster_path !== undefined); //Remove movies with no posters

        const sortedMovies = [...movieData].sort((a, b) => b.vote_count - a.vote_count); //Sort movies by vote count

        return sort ? sortedMovies : movieData;
    } catch (error) {
        // Handle errors, e.g., display an error message to the user
        console.error('Error fetching movies:', error);
    }
}

const getGenreIDs = (genreNames, genreData) => {
    return genreNames.map(genreName => {
        const genre = genreData.find(g => g.genre_name === genreName);
        return genre ? genre.id : null;
    }).filter(id => id != null);
}

const filterMovies = (genres, date, rating, movies) => {
    let filteredMovies = movies;

    if (genres.length > 0) {
        const genreIDs = getGenreIDs(genres, GenreData);
        filteredMovies = filteredMovies.filter(movie => {
            return genreIDs.every(genreID => {
                return movie.genre_ids.includes(genreID)
            });
        })

    }
    if (date) {

    }
    if (rating) {

    }
    return filteredMovies;
}

//Function to get a list of providers for a movie, and return the top 'x' amount
//of providers that are present in 'ProviderData.json'
const getAndFilterProviders = async (movieID) => {
    try {
        let data = await getWatchProviders(movieID);
        data = data.US;

        const allProvidersLink = data.link;

        //Add all providers to a singular array and remove duplicates across sections
        const sumProviders = [];
        const providerIdSet = new Set();
        providerIdSet.add(1825); //Exlcude 'Max Amazon Channel'
        for (const section in data) {
            if (section !== 'link' && data.hasOwnProperty(section)) {
                const providersInSection = data[section];
                for (const provider of providersInSection) {
                    if (!providerIdSet.has(provider.provider_id)) {
                        sumProviders.push(provider);
                        providerIdSet.add(provider.provider_id)
                    }
                }
            }
        }

        //Filter providers list to top 5 based on display priority then only keep the ones that are also
        //present in ProviderData.json so that all providers listed will have a working link
        const seperateProviderIds = new Set(ProviderData.map(provider => provider.provider_id));
        const numProviders = 5;
        const filteredProviders = sumProviders.filter(provider => seperateProviderIds.has(provider.provider_id));
        const topProviders = filteredProviders.sort((a, b) => a.display_priority - b.display_priority).slice(0, numProviders);

        const returnData = {
            'providers': topProviders,
            'link': allProvidersLink
        }
        return returnData;
    } catch (error) {
        console.error('Error fetching providers:', error);
        return null;
    }
}


//Return an array of 5 nums for star rating
    //2 = full star, 1 = half star, 0 = no star
    //ie. a 4.5 would be [2, 2, 2, 2, 1]
    //3 would be [2, 2, 2, 0, 0]
const getStarRating = (ratingTenScale) => {

    //convert from 1-10 to 1-5
    const rating = Math.round(ratingTenScale) / 2;

    let starRatings = [0, 0, 0, 0, 0];
    const solid = Math.floor(rating);
    for (let i = 0; i < solid; i++) {
        starRatings[i] = 2;
    }
    if (solid !== rating) {
        starRatings[solid] = 1;
    }

    const ratingData = {
        num: rating,
        stars: starRatings
    }
    return ratingData;
}

export {
    getMovies,
    filterMovies,
    getAndFilterProviders,
    getStarRating
};