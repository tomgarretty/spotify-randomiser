const express = require('express');
const spotify = require('./spotify');
const shuffle = require('./shuffle');

const router = new express.Router();

router.use('/spotify', spotify);
router.use('/shuffle', shuffle);

module.exports = router;