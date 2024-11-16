import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        'http://localhost:5000/api/signup',
        { username, email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        alert('Signup successful! Please login.');
        navigate('/login');
      } else {
        setError(response.data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup request failed', error);
      setError(error.response ? error.response.data.message : 'An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div style={{
      maxWidth: '450px',
      margin: '50px auto',
      padding: '25px',
      borderRadius: '10px',
      background: 'linear-gradient(to bottom, #ffffff, #f9f9f9)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
      fontFamily: '"Roboto", sans-serif'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '25px',
        fontSize: '26px',
        fontWeight: 'bold',
        color: '#444'
      }}>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#555'
          }}>Username:</label>
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
          }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          }}>Password:</label>
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
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#555'
          }}>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        {error && <p style={{
          color: 'red',
          marginTop: '10px',
          fontSize: '14px',
          textAlign: 'center'
        }}>{error}</p>}
        <button type="submit" disabled={loading} style={{
          width: '98%',
          padding: '12px',
          background: 'linear-gradient(to right, #28a745, #218838)',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          transition: 'background 0.3s ease, transform 0.2s ease'
        }}
          onMouseEnter={(e) => !loading && (e.target.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => !loading && (e.target.style.transform = 'scale(1)')}
        >
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
      <p style={{
        marginTop: '20px',
        textAlign: 'center',
        fontSize: '14px',
        color: '#555'
      }}>
        Already have an account?{' '}
        <button onClick={handleLoginRedirect} style={{
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
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;
