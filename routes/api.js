const express = require('express');
const path = require('path');
const api_v1 = require(path.join(global.contextPath, 'routes/api/api_v1.js'));

const router = express.Router();

router.use('/v1', api_v1);

module.exports = router;