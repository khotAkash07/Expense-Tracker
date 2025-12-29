// src/axiosConfig.js
import axios from 'axios';

// Function to check if token is expired
const isTokenExpired = (token) => {
    try {
        if (!token) return true;

        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        const isExpired = payload.exp < currentTime;

        console.log("Token expiry check:", {
            issued: new Date(payload.iat * 1000),
            expires: new Date(payload.exp * 1000),
            current: new Date(currentTime * 1000),
            isExpired: isExpired
        });

        return isExpired;
    } catch (error) {
        console.error("Error checking token expiry:", error);
        return true;
    }
};

// Add token to all requests automatically
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        console.log("Request interceptor - Token exists:", !!token);

        if (token) {
            // Check if token is expired
            if (isTokenExpired(token)) {
                console.log("Token expired, clearing storage and redirecting");
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('user');
                window.location.href = '/login';
                return Promise.reject(new Error('Token expired'));
            }

            console.log("Adding token to request");
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.log("No token found for request");
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle token expiration in responses
axios.interceptors.response.use(
    (response) => {
        console.log("Response received:", response.status);
        return response;
    },
    (error) => {
        console.error("Response error:", error.response?.status, error.response?.data);

        if (error.response?.status === 401 || error.response?.status === 403) {
            console.log("Authentication error, redirecting to login");
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axios;