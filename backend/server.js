const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Replace <username> and <password> with your Atlas DB user credentials
// Replace "collegeMarket" with your database name
const uri = "mongodb+srv://lisajith27:bhoombhoomshakalaka@cluster0.kyzeqfb.mongodb.net/collegeMarket";

mongoose.connect(uri)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Health check
app.get('/', (req, res) => {
  res.send('✅ Backend is running');
});


// Routes
const itemRoutes = require('./routes/items');
app.use('/items', itemRoutes);

app.listen(5000, () => console.log('Backend running on port 5000'));

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

module.exports = app;