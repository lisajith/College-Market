const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  contact: String,
  imageUrl: String,
  postedBy: String
});

module.exports = mongoose.model('Item', itemSchema);