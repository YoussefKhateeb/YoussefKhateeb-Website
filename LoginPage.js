import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage({ setPage }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!username || !password) {
            setMessage('Please fill in all fields.');
            return;
        }

        const loginData = { username, password };

        try {
            const response = await fetch('http://localhost:5001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setMessage(errorData.error || 'An error occurred during login.');
            } else {
                const data = await response.json();
                console.log('Login successful:', data.message);
                setMessage('Login successful');
                // Redirect to the home page after a successful login
                setPage('home'); // or use React Router for navigation
            }
        } catch (err) {
            console.error('Error during login:', err);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <div className="message">{message}</div>}
            <div>
                Don't have an account?{' '}
                <button onClick={() => setPage('signup')}>Sign Up</button>
            </div>
        </div>
    );
}

export default LoginPage;
