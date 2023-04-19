const express = require('express');

const router = express.Router();

router.use('/user', require('./v1/api_user.js'));

module.exports = router;