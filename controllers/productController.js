const Product = require('../models/product');
const { getPersonalizedRecommendations } = require('../services/recommendationServiice');


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getRecommendations = async (req, res) => {
  try {
    const recommendations = await getPersonalizedRecommendations(req.user._id);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};