import React, { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const login = () => {
        setIsAuthenticated(true);
        console.log('User logged in.');
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        setIsAuthenticated(false);
        console.log('User logged out.');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

