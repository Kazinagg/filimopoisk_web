// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieCarousel from './components/MovieCarousel.jsx';
// import MoviePage from './pages/MoviePage.jsx';
import { useEffect } from 'react';
import './App.css';

function App() {
    // const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Загрузка данных о фильмах
    }, []);

    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<MovieCarousel/>} exact />
                    {/*<Route path="/movie/:movieId" exact>*/}
                    {/*    <MoviePage movies={movies} />*/}
                    {/*</Route>*/}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
