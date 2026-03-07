const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Directly hard‑coded MongoDB URI
const uri = "mongodb+srv://lisajith27:bhoombhoomshakalaka@cluster0.kyzeqfb.mongodb.net/collegeMarket";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Health check
app.get('/', (req, res) => {
  res.send('✅ Backend is running');
});

// Routes
const itemRoutes = require('./routes/items');
app.use('/items', itemRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Export app for Vercel
module.exports = app;