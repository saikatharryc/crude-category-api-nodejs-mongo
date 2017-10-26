var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var schemahandy = new Schema(
  {
    name : String,
  	location :String
  }
);

  var User = new Schema({
   token:String
  });
  
  mongoose.model('User',User);
mongoose.model('collection', schemahandy);


//mongoose.connect('mongodb://localhost/local211');
mongoose.connect('mongodb://local211:local211@ds145208.mlab.com:45208/local211');
