const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use environment variable for MongoDB URI
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Health check route (Railway pings this)
app.get('/', (req, res) => {
  res.send('✅ Backend is running');
});

// Routes
const itemRoutes = require('./routes/items');
app.use('/items', itemRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// ✅ Use Railway’s dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));