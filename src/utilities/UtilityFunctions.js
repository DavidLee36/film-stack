import { getMoviesByParam, searchMovies, getWatchProviders } from './MovieDataCalls';
import GenreData from './GenreData.json';
import ProviderData from './ProviderData.json';

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

const stringArrToIntArr = (stringArr) => {
    let numArr = [];
    for(let i = 0; i < stringArr.length; i++) {
        numArr.push(parseInt(stringArr[i]));
    }
    return numArr;
}

//Helper function to determine if a movie is in between filtered date range
const filterMovieDate = (startDate, endDate, releaseDate) => {
    //Convert all three dates to an int array [year, month, day]
    const startDateArr = stringArrToIntArr(startDate.split('-'));
    const endDateArr = stringArrToIntArr(endDate.split('-'));
    const releaseDateArr = stringArrToIntArr(releaseDate.split('-'));

    if(startDateArr.length > 1) { //Get all movies released after start date
        if(startDateArr[0] > releaseDateArr[0]) return false;
        if(startDateArr[0] === releaseDateArr[0]) {
            if(startDateArr[1] > releaseDateArr[1]) return false;
            if(startDateArr[1] === releaseDateArr[1]) {
                if(startDateArr[2] > releaseDateArr[2]) return false;
            }
        }
    }
    if(endDateArr.length > 1) { //Get all movies released before end date
        if(endDateArr[0] < releaseDateArr[0]) return false;
        if(endDateArr[0] === releaseDateArr[0]) {
            if(endDateArr[1] < releaseDateArr[1]) return false;
            if(endDateArr[1] === releaseDateArr[1]) {
                if(endDateArr[2] < releaseDateArr[2]) return false;
            }
        }
    }

    return true;
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
    if (date.startDate.length > 0 || date.endDate.length > 0) {
        filteredMovies = filteredMovies.filter(movie => {
            return filterMovieDate(date.startDate, date.endDate, movie.release_date)
        });
    }
    if (rating > 0) {
        console.log('filtering rating: ', rating);
        filteredMovies = filteredMovies.filter(movie => {
            const movieRating = Math.round(movie.vote_average) / 2;
            return (movieRating >= rating);
        })
    }
    return filteredMovies;
}

//Function to get a list of providers for a movie, and return the top 'x' amount
//of providers that are present in 'ProviderData.json'
const getAndFilterProviders = async (movieID) => {
    try {
        const  data = await getWatchProviders(movieID);

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

const numToDollar = (amount) => { //Convert int to USD format ie. 1234 => $1,234
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return USDollar.format(amount);
}

//Used in converting str format ex. top_rated => Top Rated
const convertResultsForStr = (str) => {
    let words = str.split('_');
    return words.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(" ");
}

const getFavoriteMovies = () => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

const addToFavorites = (movie) => {
    let savedFavorites = getFavoriteMovies();
    savedFavorites.push(movie);
    localStorage.setItem('favorites', JSON.stringify(savedFavorites));
}

const removeFromFavorites = (movieID) => {
    let savedFavorites = getFavoriteMovies();
    savedFavorites = savedFavorites.filter(movie => movie.id !== movieID);
    localStorage.setItem('favorites', JSON.stringify(savedFavorites));
}

const movieIsFavorited = (movieID) => {
    let savedFavorites = getFavoriteMovies();
    console.log(savedFavorites);
    return savedFavorites.some(movie => movie.id === movieID);
}

export {
    getMovies,
    filterMovies,
    getAndFilterProviders,
    getStarRating,
    numToDollar,
    convertResultsForStr,
    addToFavorites,
    removeFromFavorites,
    movieIsFavorited,
    getFavoriteMovies
};