const node_modules_dir = "../../Potree/node_modules/";

var express = require(node_modules_dir + 'express/index.js');
const mariadb= require(node_modules_dir + 'mariadb/promise');
const path = require("path");

var app = express();

app.use(express.static(path.dirname(module.parent.id)));

app.get('/:pageDir',function(req,res){
	console.log((path.dirname(module.parent.id)));
	var page = (path.dirname(module.parent.id)) + req.params.pageDir;
	res.send('111111');
	res.sendFile(page);
	/*
	mariadb.createConnection({host: '127.0.0.1', user: 'root', password: '1cluedu2mariadb3', database: 'cluedu', port: '3306', multipleStatements: true})
	.then(conn => {
		conn.query('SELECT type FROM expertise;	SELECT type FROM expertise;	SELECT type FROM expertise;')
		.then (rows => {
			for (var i = 0; i < (rows.length); i++){
			console.log(rows[i]);}
			conn.end();
		})
		.catch (err => {
			console.log('Request error');
		});
	})
	.catch(err => {
		//handle error
		console.log('Connection error');
	});
	*/
});

module.exports.app = app;