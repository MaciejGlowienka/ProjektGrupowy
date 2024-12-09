import Home from './Components/Basic/Home';
import Navigation from './Components/Basic/Navigation';
import { AuthProvider, AuthContext } from './Components/Authorization/AuthContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import React from 'react';

import Kanban from './Components/Work/Kanban/Kanban';

import Authorize from './Components/Authorization/Authorize';

function App() {

  return (
      <>
        <AuthProvider>
            <Router>
            <Navigation />
                <AuthContext.Consumer>
                    {({ isAuthenticated }) => (
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
                                        setShowLoginModal={() => {
                                            console.log("Access denied. Redirecting to login.");
                                        }}
                                  />
                                }
                            />
                          </Routes>
                    </div>
                        )}
                </AuthContext.Consumer>
            </Router>
        </AuthProvider>
</>
);
}

export default App;
