const express = require('express');
const spotify = require('./spotify');

const router = new express.Router();

router.get('/authorise', (req, res) => {
    spotify.authorise(req.query.code)
        .then(() => res.status(200))
        .catch(() => res.status(500));
});

module.exports = router;