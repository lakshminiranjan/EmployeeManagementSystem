import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import './styles.css';

// Example authentication check function
const isLoggedIn = () => {
    // Check for token in localStorage (customize as per your auth logic)
    return !!localStorage.getItem('token');
};

function PrivateRoute({ children }) {
    return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

function App() {
    return (
        <div className="container-fluid p-0">
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                />
                <Route path="/" element={<LoginPage />} />
            </Routes>
        </div>
    );
}

export default App;