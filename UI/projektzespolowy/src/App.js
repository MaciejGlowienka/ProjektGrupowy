import Home from './Components/Basic/Home';
import Navigation from './Components/Basic/Navigation';
import { AuthProvider } from './Components/Authorization/AuthContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import React, { useState, useEffect } from 'react';

import Kanban from './Components/Work/Kanban/Kanban';

import Authorize from './Components/Authorization/Authorize';
import LogoutButton from './Components/General/LogoutButton'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
      <>
        <AuthProvider>
      <Router>
        <Navigation isAuthenticated={isAuthenticated}/>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>

            <Route
                path="/Kanban"
                element={
                  <Authorize
                      component={Kanban}
                      isAuthenticated={isAuthenticated}
                      setIsAuthenticated={setIsAuthenticated}
                      setShowLoginModal={setShowLoginModal}
                  />
                }
            />
          </Routes>

        </div>
      </Router>
        </AuthProvider>
</>
)
  ;
};

export default App;
