const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/cartController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(cartController.displayCart)

router.route('/delete')
    .get(cartController.deleteCartItem)


module.exports = router;