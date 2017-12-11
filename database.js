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
mongoose.connect('mongodb://test:test@ds135866.mlab.com:35866/taskerdb');
