var Project = require('./db.js').ProjectModel;

/*
 * Admin
 */
var add_project = function() {
	var name = 'Discover';
	var repo = 'northimpact/discover';
	var org = 'North Impact';
	var desc = 'Discover is a platform that connects open source innovation projects with potential contributors. ';
	var github = 'https://github.com/northimpact/discover';
	var website = 'http://discover.northimpact.com';

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