// HomePage

import React from 'react';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel.jsx';
import MovieTop from '../../components/MovieTop/MovieTop.jsx'

const HomePage = () => {
    return (
        <div>
            <MovieCarousel />
            <MovieTop />
        </div>
    );
};

export default HomePage;