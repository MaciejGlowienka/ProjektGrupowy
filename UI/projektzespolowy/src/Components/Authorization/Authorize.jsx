import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Authorize = ({
  component: Component, isAuthenticated, setIsAuthenticated
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/login")
    }
  }, []);

  return isAuthenticated ? <Component /> : null;
};

export default Authorize;
