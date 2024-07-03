import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './AuthForm.css'; // Импортируйте стили для формы

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // Для регистрации
    const [isLogin, setIsLogin] = useState(true); // Флаг для переключения между входа и регистрации
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        const requestData = isLogin
            ? { email, password }
            : { email, password, username };

        try {
            const response = await fetch(`http://192.168.3.9:8081/auth/${isLogin ? 'login' : 'register'}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                if (isLogin) {
                    const token = await response.text(); // Получаем JWT-токен
                    localStorage.setItem('token', token); // Сохраняем токен в localStorage
                    navigate('/'); // Перенаправляем на главную страницу
                } else {
                    setIsLogin(true); // Переключаемся на форму входа после успешной регистрации
                }
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Произошла ошибка');
            }
        } catch (error) {
            setError('Ошибка сети');
        }
    };

    return (
        <div className="auth-form-container">
            <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {!isLogin && ( // Показываем поле "Имя пользователя" только при регистрации
                    <div className="form-group">
                        <label htmlFor="username">Имя пользователя:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                )}
                <button type="submit" className="submit-button">
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>
                {error && <div className="error-message">{error}</div>}
            </form>
            <p>
                {isLogin ? 'Нет аккаунта?' : 'Уже зарегистрированы?'}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="toggle-form-button"
                >
                    {isLogin ? 'Зарегистрироваться' : 'Войти'}
                </button>
            </p>
        </div>
    );
};

export default AuthForm;