import React from 'react';
import MovieCarousel from '../components/MovieCarousel.jsx';
import MovieTop from '../components/MovieTop.jsx'

const HomePage = () => {
    return (
        <div>
            <MovieCarousel />
            <MovieTop />
        </div>
    );
};

export default HomePage;