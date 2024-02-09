import React, { useState } from 'react';
import axios from 'axios';
import '../Login.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom'; 

const Login = ({ onLogin }) => { // Receive onLogin prop
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://5242-41-89-4-66.ngrok-free.app/auth/signin", formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response.data); // Handle success message
      const accessToken = response.data?.data?.access_token; // Get the access token from the response data
    
      if (accessToken) {
        // Store the access token in local storage
        localStorage.setItem('token', accessToken);
        console.log("Access token:", accessToken); // Handle success message
        // Call the onLogin function passed as a prop
        onLogin(accessToken);
        // Redirect to the home page
        navigate('/');
      } else {
        console.error("Access token not found in response data");
      }
    } catch (error) {
      console.error(error.response.data); // Handle error message
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="login-input" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="login-input" />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
