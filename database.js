var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var schemahandy = new Schema(
  {name : String,
  	location :String
  }
);

mongoose.model('collection', schemahandy);

mongoose.connect('mongodb://localhost/local211');
