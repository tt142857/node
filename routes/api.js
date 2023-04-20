const express = require('express');
const api_v1 = require('./api/api_v1');

const router = express.Router();

router.use('/v1', api_v1);

module.exports = router;