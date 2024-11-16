const express = require('express');
const { signup, login } = require('../controllers/authcontrollers');
const app = express.Router();

// Signup route
app.post('/signup', signup);

// Login route
app.post('/login', login);

module.exports = app;
