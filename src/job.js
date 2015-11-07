var db = require('./db.js');
var cron = require('cron').CronJob;
var gitumber = require('gitumber');
var _ = require('underscore');

var job = function(){
	console.log(new Date()+' JOB: scrapper job started');

	var repo_list = {};
	var new_data = {};

	//1st: gets list of repos
	db.list_repos(function(err, res){
		repo_list = res;

		//get data from all the repos
		_.each(repo_list, function(repo){
			var opts = {
				'repo': repo,
				'time_windows': 'daily'
			} 

			gitumber.get_data(opts, function(data, err){
				db.update_project(repo, data, function(err){
					if(err) {
						console.log('UPDATE: something went wrong: '+err);
					} else {
						console.log('UPDATE: data from '+repo+' added');
					}
				});
			});

		});
	});
}


var start = function() {
	new cron('00 00 12 * 1 *', function() {
		//this will run everyday at midnight LA time
		job();
	}, null, true, 'America/Los_Angeles'); //maybe check github's timezone???
}

exports.start = start;