import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook
import '../Register.css'; // Import CSS file for styling

const Register = () => {
  const history = useNavigate(); // Initialize useHistory hook
  
  const [formData, setFormData] = useState({
    forename: '',
    lastname: '',
    email: '',
    password: '',
    phone_number: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post("https://5242-41-89-4-66.ngrok-free.app/auth/signup", formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data); // Handle success message
      // Redirect to the login page after successful registration
      history('/login');
    } catch (error) {
      console.error(error.response.data); // Handle error message
    }
  };
  
  

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="forename">Forename</label>
          <input type="text" className="form-control" id="forename" name="forename" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Lastname</label>
          <input type="text" className="form-control" id="lastname" name="lastname" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Phone Number</label>
          <input type="text" className="form-control" id="phone_number" name="phone_number" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
