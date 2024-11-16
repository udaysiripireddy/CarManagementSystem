const mongoose = require("mongoose");
require('dotenv').config(); // Ensure dotenv is loaded

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    
    if (!uri) {
      console.error("MongoDB URI is not defined in environment variables");
      process.exit(1);
    }

    //console.log("MongoDB URI:", uri); // Log the URI for debugging

    await mongoose.connect(uri);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;