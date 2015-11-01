var mongoose = require('mongoose');
var mongoose = require('./db.js').mongoose;

var create_schema = function() {
	console.log('creating schema');
	var projectSchema = mongoose.Schema({
		name: String,
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

	//create schema
	mongoose.model('Project', projectSchema);
}



mongoose.connection.on('open', function(){
  console.log('MONGO ADMIN: Connection open');
  create_schema();
});

