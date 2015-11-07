var db = require('./db.js');
var cron = require('cron');
var gitumber = require('gitumber');
var _ = require('underscore');

var start = function(){
	console.log('JOB: scrapper job started');

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

exports.start = start;