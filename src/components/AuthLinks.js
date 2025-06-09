import React from 'react';
import { Link } from 'react-router-dom';

const AuthLinks = ({ currentPage }) => {
    return (
        <div className="text-center mt-3">
            {currentPage === 'login' ? (
                <p>
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary">
                        Register here
                    </Link>
                </p>
            ) : (
                <p>
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary">
                        Sign in here
                    </Link>
                </p>
            )}
        </div>
    );
};

export default AuthLinks; 