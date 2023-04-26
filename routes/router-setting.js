const express = require('express');

const router = express.Router();

router.all('/*', async function(req, res, next) {
  console.log(req.session);
  if(req.session.user) {
    return next();
  }
  res.redirect('/login');
});

module.exports = router;