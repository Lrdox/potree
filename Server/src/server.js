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

app.get('/boo/:param',function(req,res){
	data = fs.readFileSync('../databaseSettings.json');
	let param = req.params.param;
	let checkIfQuery = (Object.keys(req.query)[0]);
	
	connectionSettings = JSON.parse(data).databaseConnection;
	mariadb.createConnection(connectionSettings)
	.then(conn => {
		if(checkIfQuery){
			var dir = req.query.id;
			var query = 'SELECT position_x,position_y,position_z,camera_target_x,camera_target_y,camera_target_z,camera_position_x,camera_position_y,camera_position_z FROM item WHERE item_id =' + dir + ';';
			console.log(query);
			conn.query(query)
			.then (rows => {
				res.send(rows);
				conn.end();
			})
			.catch (err => {
				console.log('Request error:');
				console.log(err);
			});
		}else if (!checkIfQuery){
			var query = 'SELECT item_A.file_directory FROM item item_A, item item_B, link WHERE item_A.item_id = link.result and item_B.item_id = link.item and item_B.name = "' + param + '";';
			console.log(query);
			conn.query(query)
			.then (rows => {
				res.sendFile(path.resolve(__dirname + "../../../Resources/" + rows[0].file_directory));
				conn.end();
			})
			.catch (err => {
				console.log('Request error:');
				console.log(err);
			});
		}
	})
	.catch(err => {
		console.log('Connection error:');
		console.log(err);
	});
});

module.exports.app = app;