const express = require('express');
const path = require('path');
const users = require(path.join(global.contextPath, 'model/users/users.js'));
const _ = require('lodash');
const requestIp = require('request-ip');

const router = express.Router();

router.post('/', async function(req, res) {
  var result = global.setResult;

  try {
    var params = req.body;
    
    var data = await users.selectUserOneWithIdPw(params);
    
    // 아이디, 비밀번호에 맞는 사용자를 찾지 못할 시
    if(_.isEmpty(data)) {
      return;
    }
    // 사용자를 찾았을 시
    var ip = requestIp.getClientIp(req);
    params.ip = ip;
    
    // 마지막 로그인일시 업데이트
    await users.updateLoginInfoUser(params);
    
    // 세션 설정
    req.session.user = data[0];

    result.data = data;
    result.status = true;
  } catch(err) {
    result.msg = `${err.msg}`;
    console.log(`api_v1 login err: ${err.result}`);
  } finally {
    res.send(result);
  }
})

module.exports = router;