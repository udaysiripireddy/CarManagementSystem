const express = require('express');
const app = express.Router();
const Upload = require('../models/Upload');
const authenticateToken = require('../middleware/authenticateToken');

// Route for uploading data
app.post('/upload', authenticateToken, async (req, res) => {
  const { name, text, imagePaths } = req.body;

  if (!name || !text || !imagePaths || !Array.isArray(imagePaths) || imagePaths.length === 0) {
    return res.status(400).json({ 
      message: 'All fields (name, text, and imagePaths) are required, and imagePaths must be a non-empty array.' 
    });
  }

  try {
    const newUpload = new Upload({ name, text, imagePaths });
    await newUpload.save();
    res.status(201).json({ message: 'Data uploaded successfully', data: newUpload });
  } catch (error) {
    console.error('Error uploading data:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Fetch all uploads
app.get('/uploads', authenticateToken, async (req, res) => {
  try {
    const uploads = await Upload.find();
    res.status(200).json(uploads);
  } catch (error) {
    console.error('Error fetching uploads:', error);
    res.status(500).json({ message: 'Failed to fetch uploads.' });
  }
});

// Delete upload by ID
app.delete('/uploads/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUpload = await Upload.findByIdAndDelete(id);
    if (!deletedUpload) {
      return res.status(404).json({ message: 'Upload not found.' });
    }
    res.status(200).json({ message: 'Data deleted successfully.' });
  } catch (error) {
    console.error('Error deleting upload:', error);
    res.status(500).json({ message: 'Failed to delete upload.' });
  }
});

// Update upload by ID
app.put('/uploads/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, text, imagePaths } = req.body;

  if (!name && !text && !imagePaths) {
    return res.status(400).json({ message: 'At least one field must be updated.' });
  }

  try {
    const updatedUpload = await Upload.findByIdAndUpdate(
      id,
      { name, text, imagePaths },
      { new: true, runValidators: true }
    );

    if (!updatedUpload) {
      return res.status(404).json({ message: 'Upload not found.' });
    }
    res.status(200).json(updatedUpload);
  } catch (error) {
    console.error('Error updating upload:', error);
    res.status(500).json({ message: 'Failed to update upload.' });
  }
});

module.exports = app;
