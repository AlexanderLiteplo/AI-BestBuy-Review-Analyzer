const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(usersController.getAllUserInfo)
    .post(usersController.updateUser);

router.route('/delete')
    .get( usersController.deleteUser);

module.exports = router;