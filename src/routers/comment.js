const express = require('express');
const { createComment } = require('../models/comment')

const router = express.Router();

router.post('/create', async function(req, res) {
  if (!req.cookies.userId)
  {
    return res.status(401).send('not logged in');
  } else {
    const userId = req.cookies.userId;
    const result = await createComment(userId, req.body.resumeId, req.body.title, req.body.description, req.body.rating);
    res.send(result);
  }
});

module.exports = router;