const express = require('express');

const router = express.Router();

router.get('/qrcode', async function(req, res) {
  try {
    res.render('qrtest.ejs');
  } catch(err) {
    console.log(`Error: ${err}`);
  }
});

router.get('/camera', async function(req, res) {
  try {
    res.render('cameratest');
  } catch(err) {
    console.log(`Error: ${err}`);
  }
})

module.exports = router;