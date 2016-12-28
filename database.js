var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var supers = new Schema(
  {
  	name : String,
  	location :String,

  }
);

mongoose.model('handel', supers);
 mongoose.connect('mongodb://localhost/local211');
// mongoose.connect('mongodb://local211:local211@ds145208.mlab.com:45208/local211');
