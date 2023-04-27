const express = require('express');

const router = express.Router();

// login page
router.get('/', async function(req, res) {
  req.session.destroy();
  res.render('users/login.ejs');
});

module.exports = router;