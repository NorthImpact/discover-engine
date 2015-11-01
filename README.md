##Discover-engine

The Discover-engine is responsible for:
- daily scrapping of github's stats of public repos that are listed in our database;
- data parsing;
- store the scrapped data in database;
- implement and provide an API for accessing the data in the database.

###Database schema

document **<project>**:

```javascript
project = {
	name = String,
	proposed_pull_requests = [{date: Date, info: String}],
	merged_pull_requests =  [{date: Date, info: String}],
	closed_issues =  [{date: Date, info: String}],
	new_issues =  [{date: Date, info: String}],
	meta: {
		organization: String,
		description: String,
		github: String,
		website: String,
	}
} 
```

###Cronjob flow
*every midnight (GMT)*

1. queries all the project's stats from its daily pulse at github; 
2. parses the results;
3. add the results to the database


###API

The Discover-engine will be running a express webserver to serve the data that is in the database. The RESTful endpoints that are accessible at this point are:

- **GET /data/:project_name**: gets all data from the document <project_name>
- **GET /data**: gets all the data from all documents

