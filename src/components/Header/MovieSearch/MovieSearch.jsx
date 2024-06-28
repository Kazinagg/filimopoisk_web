// MovieSearch

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './MovieSearch.css'; // Импортируем CSS-файл

const MovieSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [timer, setTimer] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        return () => clearTimeout(timer);
    }, [timer]);

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        setShowSuggestions(true);

        clearTimeout(timer);
        if (value.length > 2) { // Делаем запрос, только если введено больше 2 символов
            const newTimer = setTimeout(() => {
                fetch(`http://localhost:8080/search/by-keyword?keyword=${value}`)
                    .then(res => res.json())
                    .then(data => setSuggestions(data));
            }, 2000);
            setTimer(newTimer);
        } else {
            setSuggestions([]); // Очищаем список, если введено меньше 3 символов
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && searchTerm.length > 2) {
            fetch(`http://localhost:8080/search/by-keyword?keyword=${searchTerm}`)
                .then(res => res.json())
                .then(data => setSuggestions(data));
        }
    };

    return (
        <div className="movie-search"
             ref={inputRef}
             onFocus={() => setShowSuggestions(true)}>
            <div >
                <input
                    data-glow
                    type="text"
                    placeholder="Search for a movie..."
                    value={searchTerm}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
            {showSuggestions && suggestions.length > 0 && searchTerm !== '' && ( // Показываем список, если есть результаты и строка поиска не пуста
                <ul>
                    {suggestions.map(movie => (
                        <li data-glow key={movie.kinopoiskId}>
                            <Link to={`/movie/${movie.kinopoiskId}`} state={{ movie: movie }} onClick={() => setShowSuggestions(false)}>
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