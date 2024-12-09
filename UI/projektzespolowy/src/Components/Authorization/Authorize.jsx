import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Authorize = ({ component: Component, isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.log('No token found. Redirecting to home.');
      navigate('/');
    }
  }, [navigate]);

  return isAuthenticated ? <Component /> : null;
};

export default Authorize;

