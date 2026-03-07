const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = "supersecretkey"; // use env variable in production

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, rollNo, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, rollNo, password: hashedPassword, role });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { name: user.name, email: user.email, rollNo: user.rollNo, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get current user (for refresh persistence)
router.get('/me', authMiddleware, async (req, res) => {
  res.json({ user: { name: req.user.name, email: req.user.email, rollNo: req.user.rollNo, role: req.user.role } });
});

module.exports = router;