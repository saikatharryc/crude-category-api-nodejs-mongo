var express = require('express');
var mongoose = require('mongoose');
var hnd = mongoose.model('handel')
var router = express.Router();

router.get('/', function(req, res) {
  res.render('api', { title: 'Express' , name: 'saikat'});
});

router.get('/super',function(req,res) {
	hnd.find(function(err, docs){
		console.log(docs)
		res.render(
			'api',
			{
				title: 'API HERE' +docs.name,

				docs: docs
			});
	});
});

router.post('/super', function(req, res) {
  new hnd({name : req.body.name})
  .save(function(err,hand){
  	console.log(hand)
  	res.redirect('/api/super');
  });
});

router.put('/update/:id', function(req, res) {
  var query = {"_id": req.params.id};
  var update = {name : req.body.name};
  var options = {new: true};
  hnd.findOneAndUpdate(query, update, options, function(err, hand){
    console.log(hand)
    res.render(
      'api',
      {title : 'Superhero API - ' + docs.name, docs : docs}
    );
  });
});

router.delete('/update/:id', function(req, res) {
  var query = {"_id": req.params.id};
  hnd.findOneAndRemove(query, function(err, hand){
    console.log(superhero)
    res.redirect('/api/super');
  });
});

module.exports = router;