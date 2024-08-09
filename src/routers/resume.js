const express = require('express');
const { create , search, findById } = require('../models/resume');
const { listComments, getAverageRating } = require('../models/comment');

/*
 * host.com/:id => req.param
 * host.com/?id=1234 => req.query
 */

const router = express.Router();

router.post('/create', async function(req, res) {
    if (!req.cookies.userId) {
        return res.status(401).send('not logged in');
    } else {
        const userId = req.cookies.userId;
        const resume = await create(userId, req.body.education, req.body.address, req.body.email, req.body.description, req.body.dateOfBirth);
        res.send(resume);
    }
});

router.get('/search', async function(req, res){
    if (!req.cookies.userId) {
        return res.status(401).send('not logged in');
    } else {
        const name = req.query.name;
        const result = await search(name);
        res.send(result);
    }
});

router.get('/:id', async function(req, res) {
    if (!req.cookies.userId) {
        return res.status(401).send('not logged in');
    } else {
        const resumeId = req.params.id;
        const resume = await findById(resumeId);
        const comments = await listComments(resumeId);
        const averageRating = await getAverageRating(resumeId)
        res.send({
            resume: resume,
            comments: comments,
            averageRating: averageRating
        })
    }
})

module.exports = router;