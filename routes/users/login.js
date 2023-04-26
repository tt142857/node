const express = require('express');

const router = express.Router();

router.get('/', async function(req, res) {
  req.session.destroy();
  // res.status(200).render('../views/users/login');
  res.setHeader('Content-Type', 'text/html');
  res.render('users/login.ejs')
  res.status(200).end();
});

router.post('/', async function(req, res) {
  console.log(req.session);
  console.log(req.body);
  res.status(200).redirect('/login');
});

module.exports = router;