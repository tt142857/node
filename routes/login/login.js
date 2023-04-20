const express = require('express');
const router = express.Router();

router.get('/', async function(req, res) {
  res.render('login/login');
});

router.post('/', async function(req, res) {
  res.header('Content-Type', 'application/json; charset=utf-8');

  console.log('req.body: ', req.body);
  res.redirect('/login');
});

// test
router.post('/send', async function(req, res) {
  res.header('Content-Type', 'application/json; charset=utf-8');

  console.log('req.body: ', req.body);
  res.send(req.body);
});

module.exports = router;