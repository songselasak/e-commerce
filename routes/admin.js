const path = require('path')
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
router.get('/', adminController.getHomePage);
router.get('/product', adminController.getProductPage);

module.exports = router;