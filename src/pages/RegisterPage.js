import React from 'react';
import { useNavigate } from 'react-router-dom';
import Register from '../components/Register';

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/login');
    };

    return <Register onRegister={handleRegister} />;
};

export default RegisterPage;