import React from 'react';
import MovieSearch from './MovieSearch/MovieSearch.jsx'
import {Link} from "react-router-dom";
import "./Header.css"
import ThemeToggle from "./ThemeToggle/ThemeToggle.jsx"
import HomeButton from "./HomeButton/HomeButton.jsx"
import ProfileButton from "./ProfileButton/ProfileButton.jsx"


const Header = () => {
    return (
        <div>
            <div className="Header" >
                <HomeButton/>
                <MovieSearch/>
                <ProfileButton/>
                <ThemeToggle/>

            </div>
            <br/>
        </div>
    );
};

export default Header;