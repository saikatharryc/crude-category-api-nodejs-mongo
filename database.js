var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var supers = new Schema(
  {name : String}
);

mongoose.model('handel', supers);

mongoose.connect('mongodb://localhost/super');
