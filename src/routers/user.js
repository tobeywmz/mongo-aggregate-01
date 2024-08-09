const express = require('express');
const { findByCredentials } = require('../models/user');

const router = express.Router();

router.post('/login', async function (req, res) {
    console.log(req.body.username, req.body.password);
    const user = await findByCredentials(req.body.username, req.body.password);

    if (!user)
        return res.status(404).send('not found');

    res.cookie('userId', user._id.toString(), {
        maxAge: 3600 * 30 * 24 * 1000
    });
    res.send(user);
});

router.post('/logout', function(req, res) {
    res.cookie('userId', '', {
        maxAge: 0
    });
    res.send('ok')
});

module.exports = router;

