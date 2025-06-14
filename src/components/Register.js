import React, { useState } from 'react';
import { register } from '../services/api';
import AuthLinks from './AuthLinks';

const Register = ({ onRegister }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

    if (!isPasswordValid(password)) {
        setError("Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character.");
        setIsLoading(false);
        return;
    }


        try {
            const response = await register({ fullName, email, password });
            if (response.data) {
                onRegister();
            }
        } catch (err) {
            console.error('Registration error:', err);
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(err.response.data.message || 'Registration failed. Please try again.');
            } else if (err.request) {
                // The request was made but no response was received
                setError('Unable to connect to the server. Please check your internet connection.');
            } else {
                // Something happened in setting up the request that triggered an Error
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
                            <h2 className="text-center mb-4">Register</h2>
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Full Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
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
                                        {isLoading ? 'Registering...' : 'Register'}
                                    </button>
                                </div>
                            </form>
                            <AuthLinks currentPage="register" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;