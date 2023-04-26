const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const path = require('path');
const _ = require('lodash');

// login page
router.get('/', async function(req, res) {
  req.session.destroy();
  res.render('users/login.ejs');
});

// login
router.post('/', async function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).end();
  }

  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;