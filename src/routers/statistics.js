const express = require('express');
const { global } = require('../models/statistics');

const router = express.Router();

router.get('/global', async function(req, res) {
  if (!req.cookies.userId) {
    return res.status(401).send('not logged in');
  } else {
    const statistics = await global();
    res.send(statistics);
  }
});

module.exports = router;