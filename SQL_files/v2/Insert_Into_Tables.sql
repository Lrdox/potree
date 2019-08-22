INSERT INTO game VALUES (null,1,'../../../Resources/');

INSERT INTO item VALUES (null, 'Text', 'Witnesses/Witness.txt',null,null,null,null,null,null,null,null,null,null,1);
INSERT INTO item VALUES (null, 'Chat', 'Witnesses/catWitness.jpg',1,null,null,null,null,null,null,null,null,null,1);

INSERT INTO type VALUES (null, 'Expertise',null,null,1);

INSERT INTO link VALUES (null, 'Text', 2, 1, 1, 1);

/*CREATE TABLE game (
	game_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	version FLOAT NOT NULL,
	path VARCHAR(200) NOT NULL,
);
CREATE TABLE item (
	item_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(200) NOT NULL,
	file_directory VARCHAR(200) NOT NULL,
	description INTEGER,
	position_x FLOAT,
	position_y FLOAT,
	position_z FLOAT,
	camera_target_x FLOAT,
	camera_target_y FLOAT,
	camera_target_z FLOAT,
	camera_position_x FLOAT,
	camera_position_y FLOAT,
	camera_position_z FLOAT,
	game_id INTEGER,
	FOREIGN KEY (game_id) REFERENCES game(game_id),
	FOREIGN KEY (description) REFERENCES item(item_id)
);
CREATE TABLE type(
	type_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(200) NOT NULL,
	price FLOAT UNSIGNED,
	duration TIME,
	game_id INTEGER,
	FOREIGN KEY (game_id) REFERENCES game(game_id)
);
CREATE TABLE link (
	link_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(200) NOT NULL,
	item INTEGER,
	result INTEGER,
	game_id INTEGER,
	type_id INTEGER,
	FOREIGN KEY (type_id) REFERENCES type(type_id),
	FOREIGN KEY (game_id) REFERENCES game(game_id),
	FOREIGN KEY (result) REFERENCES item(item_id)
);*/