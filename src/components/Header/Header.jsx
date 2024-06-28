import React from 'react';
import MovieSearch from './MovieSearch/MovieSearch.jsx'
import {Link} from "react-router-dom";
import "./Header.css"
import ThemeToggle from "./ThemeToggle/ThemeToggle.jsx"
import HomeButton from "./HomeButton/HomeButton.jsx"


const Header = () => {
    return (
        <div>
            <div className="Header" >
                <HomeButton/>
                <MovieSearch/>
                <ThemeToggle/>
            </div>
            <br/>
        </div>
    );
};

export default Header;