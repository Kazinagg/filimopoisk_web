import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Profile.css';
import {Link} from "react-router-dom"; // Импортируйте стили для страницы профиля

// Перечисление типов отметок для фильмов
const MarkTypes = {
    1: "Избранное",
    2: "Смотрю",
    3: "Брошено"
};

const Profile = () => {
    const [markedFilms, setMarkedFilms] = useState([]);
    const [error, setError] = useState(null);
    const [movies, setMovies] = useState([]); // Используйте множественное число для массивов

    useEffect(() => {
        const fetchMarkedFilms = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Пользователь не авторизован');
                    return;
                }

                const response = await fetch('http://192.168.3.9:8081/marked/get', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setMarkedFilms(data);
                    fetchMovies(data); // Вызов функции загрузки данных о фильмах
                } else {
                    setError('Ошибка при загрузке списка фильмов');
                }
            } catch (error) {
                setError('Ошибка сети');
            }
        };

        const fetchMovies = async (films) => { // Функция для загрузки данных о фильмах
            try {
                const responses = await Promise.all(
                    films.map(film =>
                        axios.get(`http://192.168.3.9:8080/films/id/${film.kinopoiskId}`)
                    )
                );
                setMovies(responses.map(response => response.data)); // Обновляем состояние данными фильмов
            } catch (error) {
                console.error('Ошибка при получении фильмов:', error);
            }
        };

        fetchMarkedFilms();
    }, []);

    // Функция для фильтрации фильмов по типу пометки
    const filterFilmsByMark = (markType) => {
        return movies.filter(film => {
            const marked = markedFilms.find(m => m.kinopoiskId === film.kinopoiskId);
            return marked?.typeMarked === markType;
        });
    };

    return (
        <div className="profile-container1">
            <h2>Профиль</h2>
            {error ? (
                <div className="error-message">{error}</div>
            ) : (
                <div className="marked-films-columns1">
                    {Object.entries(MarkTypes).map(([markType, markLabel]) => (
                        <div key={markType} className="marked-films-column1">
                            <h3>{markLabel}</h3>
                            <ul className="marked-films-list1">
                                {filterFilmsByMark(Number(markType)).map((film) => (
                                    <li data-glow key={film.kinopoiskId} className="marked-film-item1">
                                        <Link to={`/movie/${film.kinopoiskId}`}>
                                            <div className="PosterContainer1">
                                                <img
                                                    className="movie-poster1"
                                                    src={film.posterUrl}
                                                    alt={film.nameRu || film.nameEn || film.nameOriginal}
                                                />
                                                <div className="MovieInfo1">
                                                    <h3>
                                                        {film.nameRu || film.nameEn || film.nameOriginal}
                                                    </h3>
                                                    <p>
                                                        Рейтинг: {film.ratingKinopoisk || film.ratingImdb || 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                        {/* ... */}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;
