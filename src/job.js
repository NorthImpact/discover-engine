var db = require('./db.js');
var cron = require('cron');

var start = function(){
	console.log('JOB: scrapper job started');

	//db.update_project('Discover', {proposed_pull_requests: 'this is a new proposed_pull_request!!'});
}

exports.start = start;