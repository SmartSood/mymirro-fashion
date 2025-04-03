const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  attributes: {
    color: { type: String, required: true },
    size: { type: [String], required: true },
    material: { type: String, required: true }
  },
  imageUrls: { type: [String], required: true }
});

module.exports = mongoose.model('Product', ProductSchema);