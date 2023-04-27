const express = require('express');
const path = require('path');
const users = require(path.join(global.contextPath, 'model/users/users.js'));
const _ = require('lodash');
const requestIp = require('request-ip');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// signup
const signupValidation = [
  body('id').notEmpty().isLength(8, 16)
, body('pw').notEmpty().isLength(6, 20)
, body('nm').notEmpty()
, body('hp').notEmpty()
, body('email').notEmpty()
];
router.post('/', signupValidation, async function(req, res) {
  var result = global.setResult;

  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw global.setError('validation error', validationErrors);
    }

    var params = req.body;
    params.ip = requestIp.getClientIp(req);

    var data = await users.insertUser(params);

    result.data = data;
    result.status = true;
  } catch(err) {
    result.msg = `${err.msg}`;
    console.log(`api_v1 signup err: ${err.result}`);
  } finally {
    res.send(result);
  }
});

module.exports = router;