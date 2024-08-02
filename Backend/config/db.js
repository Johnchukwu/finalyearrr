// config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // To use native findOneAndUpdate rather than the deprecated one
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
