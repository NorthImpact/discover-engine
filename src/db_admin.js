var Project = require('./db.js').ProjectModel;

/*
 * Admin
 */
var add_project = function() {
	var name = 'Medic Mobile';
	var repo = 'medic/medic-webapp';
	var org = 'Medic Mobile';
	var desc = 'The Medic Mobile web application combines SMS messaging, data collection, and analytics for health workers and health systems in hard-to-reach areas with or without internet connectivity';
	var github = 'https://github.com/medic/medic-webapp';
	var website = 'https://medicmobile.org';

	var new_project = new Project({
		name: name,
		repo: repo,
		proposed_pull_requests: [],
		merged_pull_requests: [],
		closed_issues: [],
		new_issues: [],
		meta: {
			organization: name,
			description: desc,
			github: github,
			website: website
		}
	});

	new_project.save(function(err, res){
		if (err) {
			console.log(err)
		} else {
			console.log(res);
		}
	});
}

var remove_project = function(name){
	Project.remove({name: name}, function(err, res){
		if (err) {
			console.log(err)
		} else {
			console.log(res);
		}
	});

}

var main = function() {
	console.log('ADMIN');
	add_project();
	//remove_project('Medic Mobile');
}


main();