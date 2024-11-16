import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Header = () => {
  const [username, setUsername] = useState('Hello Buddy!'); // Default to 'Guest'
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear the token and username from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    
    // Reset the username state to 'Guest'
    setUsername('Hello Buddy!');
    
    // Redirect to login page
    navigate('/login');
  };

  // Use useEffect to update the username whenever it changes in localStorage
  useEffect(() => {
    // Function to fetch the username from localStorage
    const getStoredUsername = () => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      } else {
        setUsername('Hello Buddy!'); // Fallback to 'Guest' if not found
      }
    };

    // Initialize username from localStorage on mount
    getStoredUsername();

    // Optionally: Listen for changes in localStorage using the `storage` event
    window.addEventListener('storage', getStoredUsername);

    // Cleanup: Remove event listener when component unmounts
    return () => {
      window.removeEventListener('storage', getStoredUsername);
    };
  }, []); // Empty dependency array means this effect runs only once on component mount

  return (
    <header style={styles.header}>
      <div style={styles.username}>{username}</div>
      {/* Docs link as an anchor tag, now close to the logout button */} 
      <div>
  <Link to="/docs" style={{ ...styles.docsLink, color: 'black' }}>
    Document
  </Link>
  <button onClick={handleLogout} style={styles.logoutButton}>
    Logout
  </button>
</div>

    </header>
  );
};

// Styles for the header
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f1f1f1',
    borderBottom: '1px solid #ddd',
  },
  username: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: '8px 16px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
  },
  docsLink: {
    padding: '8px 16px',
    fontSize: '16px',
    cursor: 'pointer',
    color: '#4d90fe',
    textDecoration: 'none', // Remove underline
    marginRight: '5px', // Reduced margin to bring it closer to the Logout button
  },
};

export default Header;
