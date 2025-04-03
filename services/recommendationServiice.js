const Product = require('../models/product');
const User = require('../models/User');

exports.getPersonalizedRecommendations = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }


    const recommendedProducts = await Product.find({
      'attributes.color': { $in: user.preferences.colors },
      'attributes.size': { $in: user.preferences.sizes }
    }).limit(10);

    return recommendedProducts;
  } catch (error) {
    console.error('Recommendation error:', error);
    throw error;
  }
};