const express = require('express');
const Item = require('../models/Item');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create item
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, price, contact, imageUrl } = req.body;
    const item = new Item({ title, description, price, contact, imageUrl, postedBy: req.user.name });
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to create item" });
  }
});

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Get user's items
router.get('/mine', authMiddleware, async (req, res) => {
  try {
    const items = await Item.find({ postedBy: req.user.name });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user posts" });
  }
});

// Delete item
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    if (item.postedBy !== req.user.name) return res.status(403).json({ error: "Not authorized" });

    await item.deleteOne();
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});

// Edit item
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    if (item.postedBy !== req.user.name) return res.status(403).json({ error: "Not authorized" });

    Object.assign(item, req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to update item" });
  }
});

module.exports = router;