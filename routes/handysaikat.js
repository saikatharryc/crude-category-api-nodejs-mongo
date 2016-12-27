var handysaikat = require('./routes/handysaikat');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var handysaikat = require('../models/handyapi.js');


app.use('/handysaikat',handysaikat);


/* GET /handysaikat listing. */
router.get('/', function(req, res, next) {
  handyapi.find(function (err, handysaikat) {
    if (err) return next(err);
    res.json(handysaikat);
  });
});
module.exports = router;