const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/exp9';

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(mongoUri)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the Containerized Backend!' });
});

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
