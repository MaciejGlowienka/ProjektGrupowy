import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Authorize = ({ component: Component, isAuthenticated, setIsAuthenticated, setShowLoginModal }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setShowLoginModal(true);
      navigate("/");
    }
  }, [navigate, setIsAuthenticated, setShowLoginModal]);

  return isAuthenticated ? <Component /> : null;
};

export default Authorize;

