const express = require('express');

const router = express.Router();

// signup page
router.get('/', async function(req, res) {
  res.render('users/signup.ejs');
});

module.exports = router;