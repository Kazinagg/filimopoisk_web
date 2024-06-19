import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MovieSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        return () => clearTimeout(timer);
    }, [timer]);

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        clearTimeout(timer);
        if (value.length > 2) {
            const newTimer = setTimeout(() => {
                fetch(`http://localhost:8080/search/by-keyword?keyword=${value}`)
                    .then(res => res.json())
                    .then(data => setSuggestions(data));
            }, 2000);
            setTimer(newTimer);
        } else {
            setSuggestions([]);
        }
    };

    return (
        <div>
            <input
                data-glow
                type="text"
                placeholder="Search for a movie..."
                value={searchTerm}
                onChange={handleChange}
            />
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map(movie => (
                        <li data-glow key={movie.kinopoiskId}>
                            <Link to={`/movie/${movie.kinopoiskId}`}>
                                <img
                                    src={movie.posterUrlPreview || movie.posterUrl}
                                    alt={movie.nameRu}
                                    width="50"
                                    height="75"
                                />
                                {movie.nameRu}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MovieSearch;