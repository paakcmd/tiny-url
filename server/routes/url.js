var express = require('express');
var router = express.Router();
var UrlController = require('../controller/UrlController');


// GET
router.get('/:urlId', UrlController.getUrl);
router.post('/generate', UrlController.generateShortenUrl);

module.exports = router;
