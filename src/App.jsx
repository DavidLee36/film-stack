import React from 'react';
import HomePage from './pages/HomePage';
import MovieInfo from './pages/MovieInfo';
import Footer from './pages/components/Footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import ScrollToTop from './utilities/ScrollToTop';
import FavoritesPage from './pages/FavoritesPage';

function App() {
    return (
        <Router>
            <ScrollToTop/>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/additional-info" element={<MovieInfo/>} />
                <Route path="/favorites" element={<FavoritesPage/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;