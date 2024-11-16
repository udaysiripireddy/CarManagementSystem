import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Install Axios via `npm install axios`

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to hold error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/Home'); // Redirect to home
      } else {
        setError(response.data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login request failed', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup'); // Navigate to signup page
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      borderRadius: '10px',
      background: 'linear-gradient(to bottom, #ffffff, #f0f4f8)',
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
      fontFamily: '"Roboto", sans-serif'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333'
      }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#555'
          }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '93%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => (e.target.style.borderColor = '#007bff')}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#555'
          }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '93%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => (e.target.style.borderColor = '#007bff')}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
        </div>
        <button type="submit" style={{
          width: '99%',
          padding: '12px',
          background: 'linear-gradient(to right, #007bff, #0056d4)',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          transition: 'background 0.3s ease, transform 0.2s ease'
        }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        >
          Login
        </button>
        {error && <p style={{
          color: 'red',
          marginTop: '15px',
          fontSize: '14px',
          textAlign: 'center'
        }}>{error}</p>}
      </form>
      <p style={{
        marginTop: '20px',
        textAlign: 'center',
        fontSize: '14px',
        color: '#555'
      }}>
        Don't have an account?{' '}
        <button onClick={handleSignupRedirect} style={{
          backgroundColor: 'transparent',
          color: '#007bff',
          border: 'none',
          cursor: 'pointer',
          textDecoration: 'underline',
          fontWeight: '500',
          transition: 'color 0.3s ease'
        }}
          onMouseEnter={(e) => (e.target.style.color = '#0056d4')}
          onMouseLeave={(e) => (e.target.style.color = '#007bff')}
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default Login;
