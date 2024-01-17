import React from 'react'
import '../../styles/FooterStyles.css';

const Footer = () => {
  return (
    <footer className='footer-container'>
        <p className='footer-text'>© {new Date().getFullYear()} FilmStack - This project is a work in progress, thus all features may not be complete. For updates and more info, visit our <a href="https://github.com/DavidLee36/film-stack" target="_blank" rel="noopener noreferrer">GitHub repository</a>.</p>
    </footer>
  )
}

export default Footer