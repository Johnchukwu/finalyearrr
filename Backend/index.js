// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const usersRoutes = require("./routes/users");

const recommendationRoutes = require('./routes/recommendationRoutes');
const cors = require('cors');

dotenv.config();

// Connect to databaseDD
connectDB();

const app = express();


//CORS POLICY

app.use(cors()); // Enable CORS for all requests

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); //use auth routes
app.use('api/users' , usersRoutes)
app.use("/api/recommend", recommendationRoutes);

// Start server
const PORT = process.env.PORT || 5400;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
