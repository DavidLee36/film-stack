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

To access movie data from The Movie Database (TMDb), you will need to obtain an API key and set up an authorization token:

1. Visit [The Movie Database (TMDb)](https://www.themoviedb.org) and sign up for an account.
2. Navigate to your account settings and request an API key.
3. Once you have the API key and the authorization token, you need to set up environment variables in your local environment and in your production environment (if deploying).

### Local Setup

Create a `.env` file in the root of your project and add the following lines:

```plaintext
VITE_API_KEY=your_api_key_here
VITE_AUTHORIZATION_TOKEN=Bearer your_authorization_token_here
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

- email - david303lee@gmail.com
- [LinkedIn](https://www.linkedin.com/in/david-lee-499a4a237/)

## Acknowlegments

- The Movie Database (TMDb) for providing the movie data.
