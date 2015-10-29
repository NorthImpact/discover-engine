var express = require('express');
var db = require('./src/db.js');
var job = require('./src/job.js');

var app = express();

/*
 * REST
 */

app.get('/data', function(req, res){
	//gets all weekly data from database and sends it in a JSON blob
	db.get_all(function(data){
		res.send('all projects weekly data: '+data);
	});
});

app.get('/data/:project', function(req, res){
	//gets all data from a specific project and sends it in a JSON blob
	db.get_project(req.params.project, function(data){
		res.send('all project data: '+data);
	});
});






function main() {
	//starts server
	var server = app.listen(3000, function(){
		console.log(server.address());
	});

	//starts scrapper job
	job.start();
}


main();