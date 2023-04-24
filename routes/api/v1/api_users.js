const express = require('express');
const users = require('../../../model/users/users.js');

const router = express.Router();

router.get('/list', async function(req, res) {
  try {
    var result = await users.selectUserList();
    if(result != null) {
      res.end(result);
    }
  } catch(err) {
    console.log(`api_v1_err: ${err}`);
  }
});

module.exports = router;