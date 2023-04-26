const express = require('express');

const router = express.Router();

router.all('/*', async function(req, res, next) {
  console.log('hi');
});

router.get('/', async function(req, res) {
  console.log('zzzzzzzzzzzz');
})

module.exports = router;