// src/components/AuthChecker.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthChecker = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const currentPath = window.location.pathname;

        // Pages that don't require authentication
        const publicPaths = ['/login', '/', '/Registration'];

        if (!token && !publicPaths.includes(currentPath)  ) {
            console.log("No token found, redirecting to login");
            navigate('/login');
        }
    }, [navigate]);

    return children;
};

export default AuthChecker;