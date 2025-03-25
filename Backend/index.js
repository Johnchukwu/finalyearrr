// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Routes
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const recommendationRoutes = require('./routes/recommendationRoutes');
const courseRoutes = require('./routes/courseRoutes');
const programRoutes = require('./routes/programRoutes');

dotenv.config();

// Connect to DB
connectDB();

const app = express();

// CORS
app.use(cors());

// Middleware
app.use(express.json());

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Adaptive Learning API',
        version: '1.0.0',
        description: 'API for personalized learning and course tracking'
      },
      servers: [
        {
          url: 'http://localhost:5400'
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      },
      security: [
        {
          bearerAuth: []
        }
      ]
    },
    apis: ['./Backend/routes/*.js']// ✅ This must match where your routes live
  };
  

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/recommend', recommendationRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/programs', programRoutes);
// Start server
const PORT = process.env.PORT || 5400;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
