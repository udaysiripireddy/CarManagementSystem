import React from 'react';
import { useNavigate } from 'react-router-dom';


function Button() {
  const navigate = useNavigate(); // Hook for navigation

  const handleButtonClick = () => {
    navigate('/List'); // Redirect to the List page
  };

  return (
    <>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <button
          style={{
            padding: '12px 20px',
            backgroundColor: '#10B981',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
            border: 'none',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#059669')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#10B981')}
          onClick={handleButtonClick} // Navigate on click
        >
          Add New!
        </button>
      </div>
    </>
  );
}

export default Button;
