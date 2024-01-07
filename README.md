# Film Stack

## Description

Film Stack is a web application built using React and Vite, designed to serve as a gallery for exploring various movie titles and their relevant information. This project is part of a learning journey to grow as a front-end developer and expand my portfolio. The movie data is retrieved using the API from [The Movie Database (TMDb)](https://www.themoviedb.org), offering users an engaging way to discover and learn more about their favorite films.

## Installation

To get started with Film Stack, follow these steps:

```bash
git clone https://github.com/your-username/film-stack.git
cd film-stack
npm install
```
This will clone the repository to your local machine and install all the necessary dependencies.

## API Configuration

To access movie data from The Movie Database (TMDb), you need to obtain an API key:

1. Visit [The Movie Database (TMDb)](https://www.themoviedb.org) and sign up for an account.
2. Navigate to your account settings and request an API key.
3. Once you have the API key, create a file named 'APIinfo.js' in the 'src/utilities' folder.
4. In 'APIinfo.js', set up your API key and auth token as follows:

```javascript
// src/utilities/APIinfo.js
export const API_KEY = 'your_api_key_here';

export const OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer your_authorization_token_here'
    }
};
```
Replace 'your_api_key_here' and 'your-authorization_token_here' with your actual API key and token.

## Usage

To run Film Stack locally:

```bash
npm run dev
```
Navigate to 'http://localhost:3000' (or the port provided in your terminal) in your browser to view the application.

## Features

- Browse a wide range of movies
- View detailed information about each movie
- User-friendly interface for easy navigation

## Contributing

As this project is a personal learning project/experience, contributions are not being sought at this time. However, any feedback or suggestions are welcome and greatly appreciated!

## License

This project is open-sourced under the MIT License. See the [LICENSE](LICENSE.md) file for details.

## Contact

David Lee - david303lee@gmail.com

## Acknowlegments

- The Movie Database (TMDb) for providing the movie data.
