// MovieTop

import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import './MovieTop.css';

const MovieTop = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchRandomMovies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/films/random');
                setMovies(response.data);
            } catch (error) {
                console.error('Ошибка при получении фильмов:', error);
            }
        };

        fetchRandomMovies();
    }, []);


    return (
        <div>
            <br/>
            <br/>
            <div data-glow>
                Топ Фильмов
            </div>
            <br/>

            <div data-glow>
                <div className="TopContainer">
                    {movies.map((movie) => (
                        <div key={movie.kinopoiskId} className="FilmContainer">
                            <Link to={`/movie/${movie.kinopoiskId}`} state={{movie: movie}}>
                                <div className="PosterContainer">
                                    <img
                                        className="Img-poster"
                                        src={movie.posterUrl}
                                        alt={movie.nameRu || movie.nameEn || movie.nameOriginal}
                                    />
                                    <div className="MovieInfo">
                                        <h3>
                                            {movie.nameRu || movie.nameEn || movie.nameOriginal}
                                        </h3>
                                        <p>
                                            Рейтинг:
                                            {movie.ratingKinopoisk ? (
                                                movie.ratingKinopoisk
                                            ) : movie.ratingImdb ? (
                                                movie.ratingImdb
                                            ) : (
                                                'N/A'
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieTop;