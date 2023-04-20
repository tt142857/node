const express = require('express');
const db = require('../../../mariadb');

const router = express.Router();

router.get('/list', async function(req, res) {
  try {
    var result = await db.getUserList();
    if(result != null) {
      res.end(result);
    }
  } catch(err) {
    console.log(`api_v1_err: ${err}`);
  }
});

module.exports = router;