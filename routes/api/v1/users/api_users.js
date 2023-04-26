const express = require('express');
const path = require('path');
const users = require(path.join(global.contextPath, 'model/users/users.js'));

const router = express.Router();

router.get('/list', async function(req, res) {
  try {
    var result = await users.selectUserList();
    if(result != null) {
      res.send(result);
    }
  } catch(err) {
    console.log(`api_users selectUserList Err: ${err}`);
  }
});

router.get('/:id', async function(req, res) {
  try {
    var params = req.params;
    var result = await users.selectUserOne(params);
    
    res.send(JSON.stringify(result));

  } catch(err) {
    console.log(`api_users selectUserOne Err: ${err}`)
  }
});

module.exports = router;