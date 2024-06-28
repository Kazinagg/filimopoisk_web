// App.jsx
import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header.jsx';
import HomePage from "./pages/HomePage.jsx";
import MoviePage from "./pages/MoviePage.jsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './App.css';



// const usePointerGlow = () => {
//     const [status, setStatus] = React.useState(null)
//     React.useEffect(() => {
//         const syncPointer = ({ x: pointerX, y: pointerY }) => {
//             const x = pointerX.toFixed(2)
//             const y = pointerY.toFixed(2)
//             const xp = (pointerX / window.innerWidth).toFixed(2)
//             const yp = (pointerY / window.innerHeight).toFixed(2)
//             document.documentElement.style.setProperty('--x', x)
//             document.documentElement.style.setProperty('--xp', xp)
//             document.documentElement.style.setProperty('--y', y)
//             document.documentElement.style.setProperty('--yp', yp)
//             setStatus({ x, y, xp, yp })
//         }
//         document.body.addEventListener('pointermove', syncPointer)
//         return () => {
//             document.body.removeEventListener('pointermove', syncPointer)
//         }
//     }, [])
//     return [status]
// }

function App() {
    // const [movies, setMovies] = useState([]);
    // const [status] = usePointerGlow();
    const xRef = useRef(0);
    const yRef = useRef(0);
    const xpRef = useRef(0);
    const ypRef = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            xRef.current = e.clientX.toFixed(2);
            yRef.current = e.clientY.toFixed(2);
            xpRef.current = (e.clientX / window.innerWidth).toFixed(2);
            ypRef.current = (e.clientY / window.innerHeight).toFixed(2);

            document.documentElement.style.setProperty('--x', xRef.current);
            document.documentElement.style.setProperty('--xp', xpRef.current);
            document.documentElement.style.setProperty('--y', yRef.current);
            document.documentElement.style.setProperty('--yp', ypRef.current);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <Router>
            <div className="app">
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movie/:id" element={<MoviePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
