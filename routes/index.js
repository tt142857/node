const express = require('express');
const util = require('util');
const users = require('../model/users/users.js');

const router = express.Router();

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

router.get('/login', async function(req, res) {
  res.render('../views/users/login');
});

router.get('/signup', async function(req, res) {
  res.render('../views/users/signup');
});

router.post('/signup', async function(req, res) {
  res.header('Content-Type', 'application/json; charset=utf-8');
  
  req.check('id', '').notEmpty().isLength(8, 16);
  req.check('pw', '').notEmpty().isLength(6, 20);
  req.check('nm', '').notEmpty();
  req.check('hp1', '').notEmpty();
  req.check('hp2', '').notEmpty();
  req.check('hp3', '').notEmpty();
  req.check('email', '').notEmpty();

  var errors = req.validationErrors();
  if(errors) {
    console.log(errors);
  }
  
  var params = req.body;
  users.insertUser(params);
  res.redirect('/login');
})

module.exports = router;
