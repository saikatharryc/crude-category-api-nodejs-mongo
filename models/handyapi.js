var mongoose = require('mongoose');

/**
*Schema define
**/
var qury = new mongoose.Schema ({
	ID: Number,
	Location: String,
	updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('handyapi',qury);