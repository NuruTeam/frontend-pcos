import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import ImageUploadForm from './components/ImageUploadForm';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const handleLogin = (token) => {
    setLoggedIn(true);
    setAccessToken(token);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setAccessToken(null);
  };

  return (
    <Router>
      <div className="App">
        <div className="App-content">
          <Routes>
            <Route
              path="/"
              element={<Navigate to={isLoggedIn ? '/imageupload' : '/login'} />}
            />
            <Route path="/register" element={<Register />} />
            <Route
  path="/login"
  element={<Login onLogin={handleLogin} />} // Pass onLogin prop
/>

            <Route
              path="/imageupload"
              element={isLoggedIn ? <ImageUploadForm accessToken={accessToken} /> : <Navigate to="/login" />}
            />
          </Routes>
          {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </Router>
  );
}

export default App;
