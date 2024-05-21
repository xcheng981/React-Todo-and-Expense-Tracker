import { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (!username.trim()) {
            setError('Please input username');
            return;
        }

        if (username.trim() === 'dog') {
            setError('Dog is not allowed');
            return;
        }

        onLogin(username);
    };

    return (
        <div className="login-page">
            <h2>Login Page</h2>
            <input
                className="login-input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button className="login-button" onClick={handleLogin}>Login</button>
            {error && <p className="login-error">{error}</p>}
        </div>
    );
};


export default LoginPage;
