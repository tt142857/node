const express = require('express');

const router = express.Router();

router.get('/', async function(req, res) {
  res.render('users/signup.ejs');
});

router.post('/', async function(req, res) {
  res.header('Content-Type', 'application/json; charset=utf-8');
  
  req.check('id', '').notEmpty().isLength(8, 16);
  req.check('pw', '').notEmpty().isLength(6, 20);
  req.check('nm', '').notEmpty();
  req.check('hp', '').notEmpty();
  req.check('email', '').notEmpty();

  var errors = req.validationErrors();
  if(errors) {
    console.log(errors);
    res.end();
    return false;
  }

  params = req.body;
  console.log(params);
  await users.insertUser(params);
  res.redirect('/login');
})

module.exports = router;