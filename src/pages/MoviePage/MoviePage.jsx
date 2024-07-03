import {useLocation, useParams, Link} from 'react-router-dom';
import './MoviePage.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

// Перечисление типов отметок для фильмов
const MarkTypes = {
    FAVORITE: 1, // Избранное
    WATCH: 2, // Посмотрю
    DROPPED: 3 // Брошено
};

const MoviePage = () => {
    const location = useLocation();
    const isLoggedIn = !!localStorage.getItem('token');
    // const history = useHistory();
    const { id } = useParams();
    const [movie, setMovie] = useState(location.state?.movie);

    // Хук useEffect для выполнения побочных эффектов (запрос данных)
    useEffect(() => {
        // {console.log(id)}
        // Функция для получения данных о фильме по id
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/films/id/${id}`);
                setMovie(response.data); // Обновляем состояние данными фильма
            } catch (error) {
                console.error('Ошибка при получении фильма:', error);
            }
        };


        // Получаем данные о фильме, если они не были переданы через location.state
        if (!movie) {
            fetchMovie();
        }
    }, [id, movie]); // Запускаем эффект при изменении id или movie

    const addMarkedFilm = async (typeMarked) => {
        try {
            const response = await axios.post('http://localhost:8081/marked/add', {
                kinopoiskId: id,
                typeMarked: typeMarked
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert(response.data); // Или другой способ уведомления пользователя
        } catch (error) {
            console.error('Ошибка при добавлении фильма в избранное:', error);
        }
    };

    // Если данные о фильме не загружены, отображаем сообщение "Фильм не найден"
    if (!movie) {
        return <p>Загрузка...</p>;
    }

    // Деструктуризация данных о фильме из объекта movie
    const {
        nameRu,
        nameOriginal,
        posterUrl,
        year,
        countries,
        genres,
        ratingKinopoisk,
        ratingImdb,
        description,
        filmLength,
        slogan,
        ratingAgeLimits,
        webUrl
    } = movie;

    // Возвращаем JSX для отображения информации о фильме
    return (
        <div className="movie-page">
            {isLoggedIn ? (
                <div className="movie-actions">
                    <button data-glow onClick={() => addMarkedFilm(MarkTypes.FAVORITE)}>Добавить в Избранное</button>
                    <button data-glow onClick={() => addMarkedFilm(MarkTypes.WATCH)}>Смотрю</button>
                    <button data-glow onClick={() => addMarkedFilm(MarkTypes.DROPPED)}>Брошено</button>
                </div>
            ) : (
                <div>
                </div>
            )}
            <div className="movie-header">
                <img className="movie-poster" src={posterUrl} alt={nameRu} data-glow/>
                <div className="movie-info">
                    <h1 className="movie-title">
                        {nameRu}
                        <br/>
                        {nameOriginal}
                    </h1>
                    <div className="movie-details" data-glow>
                        <p><span className="detail-title">Год:</span> {year ? `"${year}"` : '—'}</p>
                        <p><span className="detail-title">Страна:</span> {countries.map(country => country + " ")}</p>
                        <p><span className="detail-title">Жанр:</span> {genres.map(genre => genre + " ")}</p>
                        <p><span className="detail-title">Продолжительность:</span> {filmLength} мин.</p>
                        {ratingAgeLimits && <p><span className="detail-title">Возраст:</span> {ratingAgeLimits}+</p>}
                        <p><span className="detail-title">Слоган:</span> {slogan ? `"${slogan}"` : '—'}</p>
                    </div>
                    <div className="movie-ratings" data-glow>
                        {ratingKinopoisk && <p>Кинопоиск: <span className="rating-value">{ratingKinopoisk}</span></p>}
                        {ratingImdb && <p>IMDb: <span className="rating-value">{ratingImdb}</span></p>}
                    </div>
                    <a data-glow href={webUrl} target="_blank" rel="noopener noreferrer" className="movie-link">Страница
                        фильма</a>
                </div>
            </div>
            <div className="movie-description" data-glow>
                <h2>Описание</h2>
                <p>{description ? `"${description}"` : '—'}</p>
            </div>
        </div>
    );
};

export default MoviePage;