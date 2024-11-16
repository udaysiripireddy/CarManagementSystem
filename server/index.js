const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes.js');  // Ensure the correct path and extension
const uploadRoutes = require('./routes/uploadRoutes.js');  // Ensure the correct path and extension
const app = express();

dotenv.config();  // Load environment variables from .env file

const PORT = process.env.PORT || 5000;  // Default port is 5000 if not specified in environment

const corsOptions = {
  origin: 'http://localhost:5173',  // Adjust the origin as per your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());  // For parsing JSON requests

app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Routes
app.use('/api', authRoutes);
app.use('/api', uploadRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ Message: 'Hello CMS' });
});

// 404 error handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
