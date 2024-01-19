export const API_KEY = import.meta.env.VITE_API_KEY;

export const OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_AUTHORIZATION_TOKEN
    }
};