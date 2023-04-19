const express = require('express');
const db = require('../mariadb.js');

const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    var result = await db.getUserList();
    res.render('index', {
      userList: result
    });
  } catch(err) {
    console.log(`Error: ${err}`);
  }

});

module.exports = router;
