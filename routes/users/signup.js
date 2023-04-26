const express = require('express');
const path = require('path');
const users = require(path.join(global.contextPath, 'model/users/users.js'));
const { body, validationResult } = require('express-validator');

const router = express.Router();

// signup page
router.get('/', async function(req, res) {
  res.render('users/signup.ejs');
});

// signup
const signupValidation = [
    body('id').notEmpty().notEmpty().isLength(8, 16)
  , body('pw').notEmpty().isLength(6, 20)
  , body('nm').notEmpty()
  , body('hp').notEmpty()
  , body('email').notEmpty()
];
router.post('/',  signupValidation, async function(req, res) {
  res.header('Content-Type', 'application/json; charset=utf-8');
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).end();
  }

  params = req.body;
  await users.insertUser(params);
  res.redirect('/login');
})

module.exports = router;