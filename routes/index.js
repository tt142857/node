const express = require('express');

const router = express.Router();

router.all('/*', async function(req, res, next) {
  if(req.session.user) {
    return next();
  }
  res.redirect('/login');
});

/* GET home page. */
router.get('/', async function(req, res) {
  try {
    res.render('index.ejs');
  } catch(err) {
    console.log(`Error: ${err}`);
  }
});

module.exports = router;
