import React from 'react';
import HomePage from './pages/HomePage';
import MovieInfo from './pages/MovieInfo';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/additional-info" element={<MovieInfo/>} />
            </Routes>
        </Router>
    );
}

export default App;