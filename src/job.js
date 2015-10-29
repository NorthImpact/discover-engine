var db = require('./db.js');
var cron = require('cron');

var start = function(){
	console.log('JOB: scrapper job started');
}

exports.start = start;