var mongoose = require('mongoose');
var _db = require('../private.js')._db;
var db = mongoose.connect('mongodb://'+_db.ip+':'+_db.port+'/'+_db.name+'').connection;
var _ = require('underscore');

/*
 * Mongoose Schema
 */
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
 * Mongoose Schema
 */
var projectSchema = mongoose.Schema({
	name: {type: String, unique: true},
	repo: {type: String, unique: true},
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


//in development
projectSchema.methods.get_all = function(cb){
	return this.model('project').find({}, cb);
}

projectSchema.methods.get_project = function(project, cb) {
	return this.model('project').find({'name': project}, cb);
}

projectSchema.methods.update_entry = function(project, data, cb) {
	cb();
};


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
			cb(data);
		}
	});
}


/*
 * helpers
 */
var list_repos = function(cb) {
	var list = ['medic/medic-webapp', 'northimpact/discover', 'northimpact/discover-engine'];
	cb(null, list);
}

var _update_project = function(project_name, new_data) {
	/*
	_.each(new_data, function(data){
		Project.update({$push: {new_issues: {date: new Date(), info: }}}, _update_cb);
	});
	*/
	console.log('WARNING: updated not implemented yet');
};


var _update_cb = function(err){
	if(err) {
		console.log('ERROR: updating a project');
		console.log(err);
	}
}


var update_project = function(repo, data, cb){
	Project.find({'repo': repo}, function(err, res) {
		if(err) {
			cb('ERROR: '+err);
		} else {
			_update_project(res[0]['name'], data)
			cb(null);
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
exports.list_repos = list_repos;
exports.ProjectModel = Project;
exports.update_project = update_project;
exports.events =  db;
