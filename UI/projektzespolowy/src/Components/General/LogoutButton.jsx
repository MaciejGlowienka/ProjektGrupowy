import React from 'react';
import { logout } from '../Authorization/AuthService';
import { useNavigate } from 'react-router-dom';


const LogoutButton = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      setIsAuthenticated(false);
      navigate('/login'); 
    };

    return (
      <button onClick={handleLogout}>Wyloguj</button>
    );
  };

  export default LogoutButton;