const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');
const ROLES_LIST = require('../../config/roles_list');

router.route('/')
    .post(productController.getProducts)

router.route('/sentiment')
    .post(productController.getProductinfo);

router.route('/insert')
    .post(productController.insertProduct);

router.route('/addToCart')
    .post(productController.addToCart);

router.route('/filter')
    .get(productController.filterProducts);
module.exports = router;