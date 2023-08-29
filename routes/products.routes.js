const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/products.controller')

router.get('/products', ProductController.getAll)

router.get('/products/random', ProductController.getRandom)

router.get('/products/:id', ProductController.getPrdById)

router.post('/products', ProductController.addPrd)

router.put('/products/:id', ProductController.editPrd)

router.delete('/products/:id', ProductController.delete)

module.exports = router;