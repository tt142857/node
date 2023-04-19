const express = require('express');

const router = express.Router();

const api_v1 = require('./api/api_v1');
router.use('/v1', api_v1);

module.exports = router;