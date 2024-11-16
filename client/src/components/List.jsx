import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

function Form() {
  const [images, setImages] = useState(['']);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleImageChange = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index] = value;
    setImages(updatedImages);
  };

  const handleAddImageField = () => setImages([...images, '']);
  const handleRemoveImageField = (index) => setImages(images.filter((_, i) => i !== index));
  const handleNameChange = (e) => setName(e.target.value);
  const handleTextChange = (e) => setText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { imagePaths: images, name, text };
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Authentication required. Please log in.');
        return;
      }

      const response = await fetch('https:/localhost:5000/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Data uploaded successfully!');
        setImages(['']);
        setName('');
        setText('');
      } else if (response.status === 401) {
        alert('Unauthorized. Please log in again.');
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px', backgroundColor: '#fff', borderRadius: '8px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Upload Your Images</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '16px' }}>Image URLs:</label>
            {images.map((image, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                <input
                  type="text"
                  placeholder={`Image URL ${index + 1}`}
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  style={{ flex: 1, padding: '8px', marginRight: '8px' }}
                  required
                />
                {images.length > 1 && (
                  <button type="button" onClick={() => handleRemoveImageField(index)} style={{ padding: '8px', backgroundColor: '#e53e3e', color: '#fff' }}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddImageField} style={{ marginTop: '8px', padding: '8px', backgroundColor: '#3182ce', color: '#fff' }}>
              Add Image URL
            </button>
          </div>

          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            />
          </div>

          <div>
            <label>Text:</label>
            <textarea
              rows="4"
              value={text}
              onChange={handleTextChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            />
          </div>

          <button type="submit" style={{ padding: '12px', backgroundColor: '#38a169', color: '#fff', alignSelf: 'center', cursor: 'pointer' }}>
            Upload
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Form;
