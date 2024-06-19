// App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MovieSearch from './components/MovieSearch.jsx';
import HomePage from "./pages/HomePage.jsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './App.css';



const usePointerGlow = () => {
    const [status, setStatus] = React.useState(null)
    React.useEffect(() => {
        const syncPointer = ({ x: pointerX, y: pointerY }) => {
            const x = pointerX.toFixed(2)
            const y = pointerY.toFixed(2)
            const xp = (pointerX / window.innerWidth).toFixed(2)
            const yp = (pointerY / window.innerHeight).toFixed(2)
            document.documentElement.style.setProperty('--x', x)
            document.documentElement.style.setProperty('--xp', xp)
            document.documentElement.style.setProperty('--y', y)
            document.documentElement.style.setProperty('--yp', yp)
            setStatus({ x, y, xp, yp })
        }
        document.body.addEventListener('pointermove', syncPointer)
        return () => {
            document.body.removeEventListener('pointermove', syncPointer)
        }
    }, [])
    return [status]
}

function App() {
    // const [movies, setMovies] = useState([]);
    const [status] = usePointerGlow();
    useEffect(() => {
        // Загрузка данных о фильмах
    }, []);

    return (
        <Router>
            <div className="app">
                <MovieSearch/>
                <Routes>
                    <Route path="/" element={<HomePage/>} exact />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
