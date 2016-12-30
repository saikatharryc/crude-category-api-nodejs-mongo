var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');

var db = mongoose.model('collection');


router.get('/super', function(req, res) {
  db.find(function(err, mainhandle){
    console.log(mainhandle)
    res.render(
      'api',
      {title : 'Handy API', mainhandle : mainhandle}
    );
  });
});
/*
 **********************
 *location as @param. *
 *GET services list @ *
 *    location.       *
 **********************
 */
router.get('/super/sr/:locationID',function(req,res){
  var locationId = req.params.locationID; 
  db.find({ location: locationId }).distinct('name').exec(function(error, services) { 
    console.log(services) 
    res.send(services); 
  });
});

/*
 ************************
 *Service name as @param*
 *GET locations list @  *
 *service availabele.   *
 ************************
 */
router.get('/super/loc/:servID',function(req,res){
  var servId = req.params.servID; 
  db.find({ name: servId }).distinct('location').exec(function(error, locationss) { 
    console.log(locationss) 
    res.send(locationss); 
  });
});




router.post('/super', function(req, res) {
  new db({name : req.body.name , location : req.body.location})
  .save(function(err, docs) {
    console.log(docs)
    res.redirect('/api/super');
  });
});

router.get('/super/services', function(req, res) {
  res.send("hello");
});

router.get('/update/:id', function(req, res) {
  var query = {"_id": req.params.id};
  db.findOne(query, function(err, docs){
    console.log(docs)
    res.render(
      'update',
      {title : 'Service Name - ' + docs.name+' and location - '+docs.location, docs : docs}
    );
  });
});

router.put('/update/:id', function(req, res) {
  var query = {"_id": req.params.id};
  var update = {name : req.body.name,location : req.body.location};
  var options = {new: true};
  db.findOneAndUpdate(query, update, options, function(err, docs){
    console.log(docs)
    res.render(
      'update',
      {title : 'U have made change services - ' + docs.name+',  location - '+docs.location, docs : docs}
    );
  });
});

router.delete('/update/:id', function(req, res) {
  var query = {"_id": req.params.id};
  db.findOneAndRemove(query, function(err, docs){
    console.log(docs)
    res.redirect('/api/super');
  });
});

module.exports = router;
