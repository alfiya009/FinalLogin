
require('dotenv').config(); // Only for local development

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const alertRoutes = require('./routes/alert');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/alerts', alertRoutes);
// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running ✅"
  });
});


// ✅ Export the app for Vercel (Do NOT call app.listen)
module.exports = app;
