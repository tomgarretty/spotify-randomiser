const express = require('express');
const shuffle = require('./shuffle');

const router = new express.Router();

router.post('/shuffle', (req, res) => {
   shuffle.shufflePlaylist(req.query.id)
       .then(() => res.status(200))
       .catch(() => res.status(500));
});

module.exports = router;