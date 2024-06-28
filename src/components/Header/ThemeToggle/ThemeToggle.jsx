import React, { useState, useEffect } from 'react';
import "./ThemeToggle.css"


const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(true); // По умолчанию темная тема

    useEffect(() => {
        // Получаем текущую тему из localStorage, если она есть
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setIsDarkMode(storedTheme === 'dark');
        } else {
            // Если в localStorage нет темы, устанавливаем темную тему
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div>
            <div className="ThemeToggle">
                <div data-glow>
                    <input
                        type="checkbox"
                        id="toggle_checkbox"
                        checked={isDarkMode}
                        onChange={handleThemeToggle}
                    />
                    <label htmlFor="toggle_checkbox">
                        <div  id="star">
                            <div className="star" id="star-1">
                                ★
                            </div>
                            <div className="star" id="star-2">
                                ★
                            </div>
                            <div className="star" id="star-5">
                                ★
                            </div>
                        </div>
                        <div id="moon"></div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ThemeToggle;