const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://pritiprabha:priti@123@cluster0.uy7m0kr.mongodb.net/birth';

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://digital-birth-certificate-management-dazn.onrender.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
}));

mongoose.connect(MONGO_URI, { family: 4 })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/certificate', require('./routes/certificate'));
app.use('/api/users', require('./routes/users'));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ msg: err.message || 'Internal server error' });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ msg: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
