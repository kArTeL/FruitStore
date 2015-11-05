'use strict';

var express = require('express');
var controller = require('./fruit.controller');

var router = express.Router();

router.post('/', controller.index);
router.post('/buyFruits', controller.buyFruits);
//router.get('/:id',controller.show);
module.exports = router;
