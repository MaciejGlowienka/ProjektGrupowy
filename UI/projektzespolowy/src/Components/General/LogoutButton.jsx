import React, { useContext } from 'react';
import { AuthContext } from '../Authorization/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./logout.css"

const LogoutButton = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            Wyloguj
        </button>
    );
};

export default LogoutButton;
