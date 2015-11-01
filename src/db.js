var mongoose = require('mongoose');
var _db = require('../private.js')._db;

var db = mongoose.connect('mongodb://'+_db.ip+':'+_db.port+'/'+_db.name+'').connection;

db.on('open', function(){
  console.log('MONGO: Connection OPEN');
});

db.once('error', function(err){
  console.log(err);
});


var get_all = function(cb) {
	var data = {};
	
	//gets all weekly data from database
	cb(data);
}

var get_project = function(project, cb) {
	var data = {};

	//gets all data from a specific project data from database
	cb(data);
}

exports.get_all = get_all;
exports.get_project = get_project;
//to be used by admin
exports.mongoose = mongoose;