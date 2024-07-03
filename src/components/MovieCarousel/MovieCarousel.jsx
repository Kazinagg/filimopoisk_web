import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import './MovieCarousel.css';

const MovieCarousel = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchRandomMovies = async () => {
            try {
                const response = await axios.get('http://192.168.3.9:8080/films/random');
                setMovies(response.data);
            } catch (error) {
                console.error('Ошибка при получении фильмов:', error);
            }
        };

        fetchRandomMovies();
    }, []);

    const settings = {
        centerMode: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (
        <div>
            <div data-glow>
                Случайные фильмы
            </div>
            <br/>
            {movies.length > 0 ? (
                <div data-glow>
                    <Slider {...settings} >
                        {movies.map((movie) => (
                            <div key={movie.kinopoiskId}>
                                <Link to={`/movie/${movie.kinopoiskId}`} state={{ movie: movie }}>
                                    <div className="Div-poster" >
                                        <img className="Img-poster-carousel" src={movie.posterUrl} alt={movie.nameRu}/>
                                    </div>

                                </Link>
                            </div>
                        ))}
                    </Slider>
                </div>
            ) : (
                <p>Загрузка фильмов...</p>
            )}
        </div>
    );
};

export default MovieCarousel;
