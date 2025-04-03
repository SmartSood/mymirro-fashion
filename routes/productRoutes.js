const express = require('express');
const { protect } = require('../middlewares/auth');
const { getProducts, getRecommendations } = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/recommendations', protect, getRecommendations);

module.exports = router;