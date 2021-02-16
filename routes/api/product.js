const express = require('express');
const router = express.Router();

const productController = require('../../controllers/product');

// Api to create product
router.post('/product', productController.createProduct);
// Api to update product
router.put('/product', productController.updateProduct);
// Api to delete product
router.delete('/product', productController.deleteProduct);
// Api to get product
// router.get('/products', productController.getProducts);

module.exports = router;