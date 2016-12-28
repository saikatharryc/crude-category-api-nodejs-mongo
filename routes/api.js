var express = require('express');
var mongoose = require('mongoose');
var hnd = mongoose.model('handel')
var router = express.Router();

router.get('/', function(req, res) {
  res.render('api', { title: 'All services' , name: 'saikat'});
});

router.get('/super',function(req,res) {
	hnd.find(function(err, docs){
		console.log(docs)
		res.render(
			'api',
			{
				title: 'API HERE' ,
				docs: docs
			});
	});
});

router.get('/super/:LocationID',function(req,res) {

  var locationId = req.params.LocationID;

  hnd.find({location: locationId},function(err, docs){
    console.log(docs)
    res.render(
      'api',
      {
        title: 'API HERE',

        docs: docs
      });
  });
});




router.post('/super', function(req, res) {
  new hnd({name : req.body.name , location : req.body.location})
  .save(function(err,hand){
  	console.log(hand)
  	res.redirect('/api/super');
  });
});

router.put('/update/:id', function(req, res) {
  var query = {"_id": req.params.id};
  var update = {name : req.body.name, location: req.body.location};
  var options = {new: true};
  hnd.findOneAndUpdate(query, update, options, function(err, hand){
    console.log(hand)
    res.render(
      'api',
      {title : 'Handy - ' + docs.name, docs : docs}
    );
  });
});

router.delete('/update/:id', function(req, res) {
  var query = {"_id": req.params.id};
  hnd.findOneAndRemove(query, function(err, hand){
    console.log(hand)
    res.redirect('/api/super');
  });
});

module.exports = router;
