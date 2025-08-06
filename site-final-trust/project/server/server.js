const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'TrustyLads API is running!' });
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/trustylads';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  
  // Create default admin user if none exists
  const User = require('./models/User');
  User.findOne({ role: 'admin' })
    .then(admin => {
      if (!admin) {
        const defaultAdmin = new User({
          email: 'admin@trustylads.com',
          password: 'admin123',
          role: 'admin'
        });
        return defaultAdmin.save();
      }
    })
    .then(() => {
      console.log('Default admin user ensured');
    })
    .catch(err => {
      console.error('Error creating default admin:', err);
    });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});