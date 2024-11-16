const Upload = require('../models/Upload');

// Route for uploading data with multiple images
exports.uploadData = async (req, res) => {
  const { name, text, imagePaths } = req.body;

  // Validation: Ensure all required fields are provided
  if (!name || !text || !Array.isArray(imagePaths) || imagePaths.length === 0) {
    return res.status(400).json({
      message: 'All fields (name, text, and at least one image) are required.',
    });
  }

  try {
    const newUpload = new Upload({
      name,
      text,
      imagePaths, // Save all image URLs as an array
    });

    await newUpload.save();

    res.status(201).json({
      message: 'Data uploaded successfully',
      data: newUpload,
    });
  } catch (error) {
    console.error('Error uploading data:', error);
    res.status(500).json({
      message: 'Server error. Please try again later.',
    });
  }
};

// Route for fetching all uploaded data
exports.getUploads = async (req, res) => {
  try {
    const uploads = await Upload.find();
    res.status(200).json(uploads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

// Route for fetching a single upload by ID
exports.getUploadById = async (req, res) => {
  const { id } = req.params;

  try {
    const upload = await Upload.findById(id);

    if (!upload) {
      return res.status(404).json({ error: 'Data not found' });
    }

    res.status(200).json(upload);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};
