import { BASE_URL, PAGES_TO_CALL } from "./config";
import { API_KEY, OPTIONS } from "./APIinfo";


const fetchMovieData = async (url) => {
    try {
        
        const response = await fetch(url, OPTIONS);
        const data = await response.json();
        return data.results; // Return the results directly, no need for an intermediary variable
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error; // Rethrow the error for the caller to handle
    }
};

const getMultiplePages = async(url) => {
    let movies = [];

    for(let i = 1; i <= PAGES_TO_CALL; i++) {
        const movieData = await fetchMovieData(url.concat(i.toString()));
        if(movieData.length === 0) {
            break;
        }
        movies = movies.concat(movieData);
    }
    return(movies);
}

//Get movies based on a parameter such as 'popular' or 'trending'
const getMoviesByParam = async(param) => {

    let url = `${BASE_URL}movie/${param}?language=en-US&page=`;

    const movies = getMultiplePages(url);

    return(movies);
};

const searchMovies = async(search) => {
    const url = `${BASE_URL}search/movie?query=${search}&include_adult=false&language=en-US&page=`;

    const movies = getMultiplePages(url)
    return(movies);
};

const getWatchProviders = async(id) => {
    const url = `${BASE_URL}movie/${id}/watch/providers`;
    return(fetchMovieData(url));
}

//Main method not working, call directly
const getSingularMovie = async(id) => {
    //console.log(id)
    const url = `${BASE_URL}movie/${id}?api_key=${API_KEY}`;
    const response = await fetch(url)
    const data = await response.json();
    //console.log(data);
    return(data);
}

//Tradiotanl method not working for some reason so call directly with api key
const getMovieCredits = async (id) => {
    const url = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    const cast = data.cast; //return just the cast of the movie
    return(cast);
}

export {
    getMoviesByParam,
    searchMovies,
    getWatchProviders,
    getMovieCredits,
    getSingularMovie
};