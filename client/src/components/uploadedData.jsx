import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function UploadedData() {
  const [uploadedData, setUploadedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', text: '', _id: '' });
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [selectedImages, setSelectedImages] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');  // Search term state

  const username = 'uday';
  const password = '123456789';

  useEffect(() => {
    const loginAndFetchData = async () => {
      try {
        if (!authToken) {
          const loginResponse = await axios.post('http://localhost:5000/api/login', {
            username,
            password,
          });
          const token = loginResponse.data.token;
          setAuthToken(token);
          localStorage.setItem('authToken', token);
        }
        const dataResponse = await axios.get('http://localhost:5000/api/uploads', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setUploadedData(dataResponse.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data or login');
      } finally {
        setLoading(false);
      }
    };

    loginAndFetchData();
  }, [authToken]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtered data based on search term
  const filteredData = uploadedData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageClick = (images) => {
    setSelectedImages(images);
    setIsPopupOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/uploads/${editData._id}`, editData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUploadedData((prevData) =>
        prevData.map((item) => (item._id === editData._id ? response.data : item))
      );
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating item:', err);
      setError('Failed to update item');
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/uploads/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUploadedData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error deleting item:', err);
      setError('Failed to delete item');
    }
  };

  const handleEditClick = (item) => {
    setEditData({ ...item });
    setIsEditing(true); // Set to true to show the edit form
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (filteredData.length === 0) return <p>No data found.</p>;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Uploaded Data</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by car name"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ width: '40%', padding: '10px', fontSize: '16px', marginBottom: '20px' }}
      />

      {/* Edit Form */}
      {isEditing && (
        <form onSubmit={handleEditSubmit} style={{ marginBottom: '20px' }}>
          <h3>Edit Item</h3>
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            placeholder="Name"
            required
            style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
          />
          <textarea
            value={editData.text}
            onChange={(e) => setEditData({ ...editData, text: e.target.value })}
            placeholder="Text"
            required
            style={{ padding: '10px', width: '100%', marginBottom: '20px', minHeight: '100px' }}
          />
          <button type="submit" style={editButtonStyle}>Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)} style={cancelButtonStyle}>Cancel</button>
        </form>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredData.map((item) => {
          // Use the first image in imagePaths as the default image
          const defaultImage = item.imagePaths && item.imagePaths.length > 0 ? item.imagePaths[0] : item.imagePath;

          return (
            <div
              key={item._id}
              style={{
                width: '300px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                overflow: 'hidden',
              }}
            >
              <img
                src={defaultImage}
                alt={item.name}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
                onClick={() => handleImageClick(item.imagePaths || [item.imagePath])}
              />
              <div style={{ padding: '15px' }}>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => handleEditClick(item)}  // Update to call handleEditClick
                    style={editButtonStyle}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(item._id)}
                    style={deleteButtonStyle}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isPopupOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '80%',
              maxWidth: '800px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setIsPopupOpen(false)}
              style={popupCloseButtonStyle}
            >
              ✕
            </button>
            <Carousel
              showThumbs={false}
              showArrows={true}
              infiniteLoop={true}
              autoPlay={true}
              stopOnHover={true}
              renderArrowPrev={(clickHandler) => (
                <button
                  onClick={clickHandler}
                  style={{ ...carouselArrowStyle, left: '10px' }}
                >
                  ◀
                </button>
              )}
              renderArrowNext={(clickHandler) => (
                <button
                  onClick={clickHandler}
                  style={{ ...carouselArrowStyle, right: '10px' }}
                >
                  ▶
                </button>
              )}
              renderIndicator={(clickHandler, isSelected) => (
                <span
                  onClick={clickHandler}
                  style={isSelected ? carouselDotActiveStyle : carouselDotStyle}
                />
              )}
            >
              {selectedImages.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Slide ${index}`} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
}

// Custom styles for buttons and other elements
const editButtonStyle = {
  padding: '10px 15px',
  backgroundColor: '#28a745',  // Green color for Edit button
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const cancelButtonStyle = {
  padding: '10px 15px',
  backgroundColor: '#dc3545',  // Red color for Cancel button
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const deleteButtonStyle = {
  padding: '10px 15px',
  backgroundColor: '#dc3545',  // Red color for Delete button
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const popupCloseButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '24px',
  color: '#fff',
  cursor: 'pointer',
};

const carouselArrowStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: '#fff',
  fontSize: '24px',
  border: 'none',
  padding: '10px',
  borderRadius: '50%',
  cursor: 'pointer',
};

const carouselDotStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  margin: '0 5px',
  cursor: 'pointer',
};

const carouselDotActiveStyle = {
  backgroundColor: '#fff',
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  margin: '0 5px',
  cursor: 'pointer',
};

export default UploadedData;