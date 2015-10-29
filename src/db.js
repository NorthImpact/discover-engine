var mongoose = require('mongoose');

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