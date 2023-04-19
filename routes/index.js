const express = require('express');
const db = require('../mariadb.js');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    res.render('index');
    
    var result = await db.getUserList();
    console.log(result);
  } catch(err) {
    console.log(`Error: ${err}`);
  }

});

module.exports = router;
