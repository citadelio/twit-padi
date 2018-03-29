var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://citadel:jakande@ds117719.mlab.com:17719/heroku_vckb7nk5')
db.connection;
var Schema = mongoose.Schema;

var handleSchema = new Schema({
	handle:{
		type:String,
		required:true
	}
});

var Handle = module.exports = mongoose.model('handle', handleSchema);