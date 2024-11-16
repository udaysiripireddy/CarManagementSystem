import React, { useState } from 'react';

function Card({ image, name, text }) {
  return (
    <div style={{ maxWidth: '370px', margin: '30px', padding: '20px', backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
      <img 
        src={image ? URL.createObjectURL(image) : 'https://via.placeholder.com/320x180'} 
        alt={name} 
        style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} 
      />
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginTop: '12px' }}>{name}</h3>
      <p style={{ fontSize: '14px', color: '#555', marginTop: '8px' }}>{text}</p>
    </div>
  );
}

function Form() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [cards, setCards] = useState([]); // List of cards stored in the state

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the new card to the list of cards
    setCards([...cards, { image, name, text }]);
    // Reset form after submission
    setImage(null);
    setName('');
    setText('');
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px', backgroundColor: 'white', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', marginBottom: '24px' }}>Upload New One!</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="image" style={{ fontSize: '18px', fontWeight: '500' }}>Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            style={{ marginTop: '8px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="name" style={{ fontSize: '18px', fontWeight: '500' }}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            required
            style={{ marginTop: '8px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="text" style={{ fontSize: '18px', fontWeight: '500' }}>Text Area:</label>
          <textarea
            id="text"
            name="text"
            rows="4"
            value={text}
            onChange={handleTextChange}
            required
            style={{ marginTop: '8px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ 
            width: '50%', 
            padding: '12px', 
            backgroundColor: '#10B981', 
            color: 'white', 
            borderRadius: '4px', 
            cursor: 'pointer', 
            transition: 'background-color 0.3s ease',
            margin: '0 auto'
          }} 
          onMouseEnter={e => e.target.style.backgroundColor = '#059669'} 
          onMouseLeave={e => e.target.style.backgroundColor = '#10B981'}
        >
          Upload
        </button>
      </form>

      {/* Render Cards Dynamically */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '24px' }}>
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <Card key={index} image={card.image} name={card.name} text={card.text} />
          ))
        ) : (
          <p>No cards uploaded yet. Please upload data.</p>
        )}
      </div>
    </div>
  );
}

export default Form;
