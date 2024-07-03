import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

const ProfileButton = () => {
    const isLoggedIn = !!localStorage.getItem('token');
    const location = useLocation();
    const navigate = useNavigate(); // Используйте useNavigate вместо useHistory

    const handleLogout = () => {
        localStorage.removeItem('token');
        // Добавьте здесь дополнительные действия для выхода из системы, если необходимо
        navigate('/'); // Переход на главную страницу с помощью navigate
    };

    return (
        <div className="GoToStartButton_Conteiner">
            {isLoggedIn ? (
                location.pathname === '/profile' ? (
                    <button data-glow className="auth-button" onClick={handleLogout}>Выйти из аккаунта</button>
                ) : (
                    <Link to="/profile">
                        <button data-glow className="auth-button">Личный кабинет</button>
                    </Link>
                )
            ) : (
                <Link to="/login">
                    <button data-glow className="auth-button">Вход/Регистрация</button>
                </Link>
            )}
        </div>
    );
};

export default ProfileButton;
