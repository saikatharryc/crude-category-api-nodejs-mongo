var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/login',function(req,res,next){
  if(req.body.user==='kiot' && req.body.password==='Kiot@321'){
    let  token='';
    for(i=0;i<15;i++){
      token+=String.fromCharCode(Math.floor(Math.random() * (110 - 60) + 60));
    }
      new db({token:token})
      .save(function(reject,done){
        if(reject){
          console.log(reject);
          throw reject;
        }
        res.send({token:done})
      });
  }
})

module.exports = router;
