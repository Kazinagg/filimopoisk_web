// MovieCarousel.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Убедитесь, что у вас установлен axios

const MovieCarousel = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Функция для получения случайных фильмов
        const fetchRandomMovies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/films/random?quantity=20');
                setMovies(response.data);
            } catch (error) {
                console.error('Ошибка при получении фильмов:', error);
            }
        };

        fetchRandomMovies();
    }, []);

    // Код для карусели (используйте библиотеку, например, 'react-slick' или 'swiper')
    return (
        <div className="carousel">
            {movies.map((movie) => (
                <Link to={`/movie/${movie.kinopoiskId}`} key={movie.kinopoiskId}>
                    <img src={movie.posterUrlPreview} alt={movie.nameRu} />
                </Link>
            ))}
        </div>
    );
};

export default MovieCarousel;

