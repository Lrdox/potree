const node_modules_dir = "../../Potree/node_modules/";

var express = require(node_modules_dir + 'express/index.js');
const mariadb= require(node_modules_dir + 'mariadb/promise');
const path = require("path");
const fs = require('fs');

var app = express();

app.use(express.static(path.dirname(module.parent.id)));

app.get('/',function(req,res){
	res.send('ca marche po chef');
});

app.get('/boo/:pageDir',function(req,res){
	data = fs.readFileSync('../databaseSettings.json');
	connectionSettings = JSON.parse(data).databaseConnection;
	mariadb.createConnection(connectionSettings)
	.then(conn => {
		var query = 'SELECT CONCAT(folder_A.path, (SELECT folder.path FROM folder JOIN item ON folder.folder_id = item.file_directory WHERE folder.name = "' + req.params.pageDir + '")) AS directory FROM folder folder_A WHERE folder_A.folder_id = (SELECT parent_id FROM folder JOIN item ON folder.folder_id = item.file_directory WHERE folder.name = "' + req.params.pageDir + '");' ;
		console.log(query);
		conn.query(query)
		.then (rows => {
			res.send(rows[0].directory);
			conn.end();
		})
		.catch (err => {
			console.log('Request error:');
			console.log(err);
		});
	})
	.catch(err => {
		console.log('Connection error:');
		console.log(err);
	});
});

module.exports.app = app;