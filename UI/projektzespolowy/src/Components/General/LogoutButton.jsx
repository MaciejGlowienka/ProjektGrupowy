import React, { useContext } from 'react';
import { AuthContext } from '../Authorization/AuthContext';
import { useNavigate } from 'react-router-dom';
import { logout as logoutService } from '../Authorization/AuthService';
import "./logout.css";

const LogoutButton = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutService();
            logout();
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            Wyloguj
        </button>
    );
};

export default LogoutButton;
