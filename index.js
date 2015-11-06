var express = require('express');
var db = require('./src/db.js');
var cronjob = require('./src/job.js');

var app = express();

/*
 * REST
 */

app.get('/data', function(req, res){
	db.get_all(function(data){
		res.send(data);
	});
});

app.get('/data/:project', function(req, res){
	db.get_project(req.params.project, function(data){
		res.send(data);
	});
});

function main() {

	db.events.on('open', function(){
		cronjob.start();
	});

	var server = app.listen(3000, function(){
		console.log(server.address());
	});

}

main();