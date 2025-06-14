import React, { useState } from 'react';
import { login } from '../services/api';
import AuthLinks from './AuthLinks';

// Password validation function
const isPasswordValid = (password) => {
    return (
        /[A-Z]/.test(password) &&      // Uppercase
        /[a-z]/.test(password) &&      // Lowercase
        /[0-9]/.test(password) &&      // Number
        /[^A-Za-z0-9]/.test(password) && // Special char
        password.length >= 8
    );
};

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Password validation before API call
        if (!isPasswordValid(password)) {
            setError("Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await login({ email, password });
            if (response.data) {
                localStorage.setItem('token', response.data.token);
                onLogin();
            }
        } catch (err) {
            console.error('Login error:', err);
            if (err.response) {
                setError(err.response.data.message || 'Invalid credentials');
            } else if (err.request) {
                setError('Unable to connect to the server. Please check your internet connection.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Login</h2>
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="d-grid">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Logging in...' : 'Login'}
                                    </button>
                                </div>
                            </form>
                            <AuthLinks currentPage="login" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;