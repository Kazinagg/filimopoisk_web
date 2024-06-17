// MoviePage.jsx
import { useParams } from 'react-router-dom';

const MoviePage = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id.toString() === movieId);

    return (
        <div>
            {movie ? (
                <>
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                    {/* Другая информация о фильме */}
                </>
            ) : (
                <p>Фильм не найден.</p>
            )}
        </div>
    );
};

export default MoviePage;
