// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cors = require('cors');

dotenv.config();
//CORS POLICY

app.use(cors()); // Enable CORS for all requests

// Connect to databaseDD
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5900;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
