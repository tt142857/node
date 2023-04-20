const express = require('express');
const router = express.Router();

router.get('/', async function(req, res) {
  res.render('login/login');
});

router.post('/', async function(req, res) {
  res.header('Content-Type', 'application/json; charset=utf-8');
  console.log('req.body: ', req.body);
  console.log('req.query: ', req.query);
  // console.log('req: ', req);
  res.redirect('/login');
  // res.send(req);
});

router.post('/send', async function(req, res) {
  console.log('send req.body: ', req.body);
  console.log('req.path: ', req.path);
  console.log('req.query: ', req.query);
  res.send(req.body);
})

module.exports = router;