// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';// Optional: Create a CSS file for styling

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // String for error message

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token); // Store JWT token
      setError('');
      alert('Login successful');
      // Additional code to redirect or fetch user data if needed
    } catch (err) {
      // Safely extract the error message
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Error from server response
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div class="center">

      
<div class="form-container">
    <form class="form" onSubmit={handleLogin}>
        <span class="heading">Login </span>
      
        <div class="brutalist-container">
  <input
  type="text"
          placeholder="Username"
    class="brutalist-input smooth-type"
    value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
  />
  <label class="brutalist-label">Username</label>
</div>
<div class="brutalist-container">
  <input
     type="password"
          placeholder="Password"
    class="brutalist-input smooth-type"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <label class="brutalist-label">Password</label>
</div>

        
        
        
      
        {/* Render error only if it's a string */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div class="button-container">
        <button class="send-button">Send</button>
        <div class="reset-button-container">
            <div id="reset-btn" class="reset-button">Reset</div>
        </div>
    </div>
      <h3 className='mini'> <a href="/Register">Need an account ! Register now</a></h3> 
</form>
</div>
</div>
  );
}

export default Login;
