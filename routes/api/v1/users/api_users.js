const express = require('express');
const path = require('path');
const users = require(path.join(global.contextPath, 'model/users/users.js'));
const _ = require('lodash');

const router = express.Router();

// 아이디 중복 확인
router.get('/:id', async function(req, res) {
  var result = global.setResult;

  try {
    var params = req.params;
    var data = await users.checkId(params);

    // 중복된 아이디가 없을 경우
    if(_.isEmpty(data)) {
      return;
    }

    result.data = data;
    result.status = true;
  } catch(err) {
    result.msg = `${err.msg}`;
    console.log(`api_v1 checkId err: ${err.result}`);
  } finally {
    res.send(result);
  }
});

module.exports = router;