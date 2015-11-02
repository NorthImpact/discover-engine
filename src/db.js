var mongoose = require('mongoose');
var _db = require('../private.js')._db;
var db = mongoose.connect('mongodb://'+_db.ip+':'+_db.port+'/'+_db.name+'').connection;

/*
 * Mongoose Schema
 */
var projectSchema = mongoose.Schema({
	name: {type: String, unique: true},
	proposed_pull_requests: [{date: Date, info: String}],
	merged_pull_requests: [{date: Date, info: String}],
	closed_issues: [{date: Date, info: String}],
	new_issues: [{date: Date, info: String}],
	meta: {
		organization: String,
		description: String,
		github: String,
		website: String,
	}
});

var Project = mongoose.model('project', projectSchema);


db.on('open', function(){
  console.log('MONGO: Connection OPEN');
});

db.once('close', function(){
  console.log('MONGO: Connection CLOSED');
});

db.once('error', function(err){
  console.log(err);
});


/*
 * API queries
 */
var get_all = function(cb) {
	Project.find({}, function(err, data){
		if(err) {
			console.log(err);
		} else {
			console.log(data);
			cb(data);
		}
	});
}

var get_project = function(project, cb) {
	Project.find({'name': project}, function(err, data){
		if(err) {
			console.log(err);
		} else {
			console.log(data);
			cb(data);
		}
	});
}

/*
 * Update entry
 */
 var update_project = function(project_name, new_data) {

 	Project.find({name: project_name}, function(err, data) {
 		if(err) {
 			console.log('ERR: trying to update a project that does not exist');
 		} else {
 			if(new_data['proposed_pull_requests']) {
				Project.update({name: project_name}, 
					{$push:{'proposed_pull_requests': new_data['proposed_pull_requests']}}, 
					function(err, data) {
						if(err) {
							console.log(err);
						} else {
							console.log("UPDATE: proposed_pull_requests added to "+project_name);
						}
					});

 			} if (new_data['merged_pull_requests']) {
				Project.update({name: project_name}, 
					{$push:{'merged_pull_requests': new_data['merged_pull_requests']}}, 
					function(err, data) {
						if(err) {
							console.log(err);
						} else {
							console.log("UPDATE: merged_pull_requests added to "+project_name);
						}
					});

 			} if(new_data['closed_issues']) {
				Project.update({name: project_name}, 
					{$push:{'closed_issues': new_data['closed_issues']}}, function(err, data) {
						if(err) {
							console.log(err);
						} else {
							console.log("UPDATE: closed_issues added to "+project_name);
						}
					});
				
 			} if(new_data['new_issues']) {
				Project.update({name: project_name}, 
					{$push:{'new_issues': new_data['new_issues']}}, function(err, data) {
						if(err) {
							console.log(err);
						} else {
							console.log("UPDATE: new issue added to "+project_name);
						}
					});
 			}
 		}
 	});
}



//clean exit with CTRL-C
process.on('SIGINT', function(){
	mongoose.disconnect();
	process.exit();
});


exports.get_all = get_all;
exports.get_project = get_project;
exports.update_project = update_project;
exports.ProjectModel = Project;