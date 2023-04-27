const express = require('express');

const router = express.Router();

router.use('/users', require('./v1/users/api_users.js'));
router.use('/login', require('./v1/users/api_login.js'));
router.use('/signup', require('./v1/users/api_signup.js'));

module.exports = router;