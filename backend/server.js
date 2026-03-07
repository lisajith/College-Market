const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: "https://college-market-stmarry.netlify.app/", // replace with your actual Netlify URL
  credentials: true
}));
app.use(express.json());

// MongoDB Atlas connection
const uri = "mongodb+srv://lisajith27:bhoombhoomshakalaka@cluster0.kyzeqfb.mongodb.net/collegeMarket";

mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));
  
// Health check
app.get('/', (req, res) => {
  res.send('✅ Backend is running');
});

// Routes
const itemRoutes = require('./routes/Items'); // ✅ lowercase
app.use('/items', itemRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// ✅ Use Railway’s dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

module.exports = app;