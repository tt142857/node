const express = require('express');
const users = require('../model/users/users.js');

const router = express.Router();

router.all('/*', async function(req, res, next) {
  console.log(req.session);
  if(req.session.user) {
    return next();
  }
  res.redirect('/login');
});

/* GET home page. */
router.get('/', async function(req, res) {
  try {
    var result = await users.selectUserList();
    res.render('index', {
      userList: result
    });
  } catch(err) {
    console.log(`Error: ${err}`);
  }

});

module.exports = router;
