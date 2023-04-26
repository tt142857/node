const express = require('express');

const router = express.Router();

router.use('/users', require('./v1/users/api_users.js'));

module.exports = router;