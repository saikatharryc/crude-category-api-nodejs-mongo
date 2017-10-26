var express = require('express');
var fs =require('fs');
var bodyParser = require('body-parser');

var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.model('collection');
var user = mongoose.model('User');

router.get('/super', function(req, res) {
  let token = req.headers.token;
  if(!token){
    return res.send({err:'Unauthorized'})
  }
  user.find({token:token},function(err, mainhandles){
    if(err || mainhandles.length === 0){
     return res.send({err:'Unauthorized'})
    }
    db.find(function(err, mainhandle){
      console.log(mainhandle)
      return res.send(
        {mainhandle : mainhandle}
      );
    });
  })

});


/*
 **********************
 *location as @param. *
 *GET services list @ *
 *    location.       *
 **********************
 */
router.get('/super/sr/:locationID',function(req,res){
  let token = req.headers.token;
  if(!token){
    return res.send({err:'Unauthorized'})
  }
  user.find({token:token},function(err, mainhandles){
    if(err || mainhandles.length === 0){
     return res.send({err:'Unauthorized'})
    }
  var locationId = req.params.locationID; 
  db.find({ location: locationId }).distinct('name').exec(function(error, services) { 
    console.log(services) 
    res.send(services); 
  });
});
});


router.get('/super/locations',function(req,res){
  let token = req.headers.token;
  if(!token){
    return res.send({err:'Unauthorized'})
  }
  user.find({token:token},function(err, mainhandles){
    if(err || mainhandles.length === 0){
     return res.send({err:'Unauthorized'})
    }
  db.distinct('location',function(err, docs1){
            console.log(docs1);
            res.send(docs1);
      });
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
  let token = req.headers.token;
  if(!token){
    return res.send({err:'Unauthorized'})
  }
  user.find({token:token},function(err, mainhandles){
    if(err || mainhandles.length === 0){
     return res.send({err:'Unauthorized'})
    }
  var servId = req.params.servID; 
  db.find({ name: servId }).distinct('location').exec(function(error, locationss) { 
    console.log(locationss) 
    res.send(locationss); 
  });
});
});




router.post('/super', function(req, res) {
  let token = req.headers.token;
  if(!token){
    return res.send({err:'Unauthorized'})
  }
  user.find({token:token},function(err, mainhandles){
    if(err || mainhandles.length === 0){
     return res.send({err:'Unauthorized'})
    }
  new db({name : req.body.name , location : req.body.location})
  .save(function(err, docs) {
    console.log(docs)
    res.send(docs);
  });
})
});


router.get('/update/:id', function(req, res) {
  let token = req.headers.token;
  if(!token){
    return res.send({err:'Unauthorized'})
  }
  user.find({token:token},function(err, mainhandles){
    if(err || mainhandles.length === 0){
     return res.send({err:'Unauthorized'})
    }
  var query = {"_id": req.params.id};
  db.findOne(query, function(err, docs){
    console.log(docs)
    res.send({
       docs : docs}
    );
  });
})
});


router.post('/update/create', function(req, res) {
  let token = req.headers.token;
  if(!token){
    return res.send({err:'Unauthorized'})
  }
  user.find({token:token},function(err, mainhandles){
    if(err || mainhandles.length === 0){
     return res.send({err:'Unauthorized'})
    }
    let savableObj =  {
      name:req.body.name,
      location:req.body.location
    };
    let some = new db(savableObj);
  some.save(function(err, docs){
    console.log(docs)
    res.send(
      {docs : docs}
    );
  });
})
});

router.post('/update/:id', function(req, res) {
  let token = req.headers.token;
  if(!token){
    return res.send({err:'Unauthorized'})
  }
  user.find({token:token},function(err, mainhandles){
    if(err || mainhandles.length === 0){
     return res.send({err:'Unauthorized'})
    }
  var query = {"_id": req.params.id};
  var update = {name : req.body.name,location : req.body.location};
  var options = {new: true};
  db.findOneAndUpdate(query, update, options, function(err, docs){
    console.log(docs)
    res.send(
      
      {docs : docs}
    );
  });
})
});

router.post('/update/delete/:id', function(req, res) {
  let token = req.headers.token;
  if(!token){
    return res.send({err:'Unauthorized'})
  }
  user.find({token:token},function(err, mainhandles){
    if(err || mainhandles.length === 0){
     return res.send({err:'Unauthorized'})
    }
  var query = {"_id": req.params.id};
  db.findOneAndRemove(query, function(err, docs){
    console.log(docs)
    res.send(docs);
  });
  })
});


module.exports = router;
