INSERT INTO folder VALUES (null, 'Witnesses','Witnesses/',1,null);
INSERT INTO folder VALUES (null, 'Objects','Objects/',1,null);
INSERT INTO folder VALUES (null, 'Images','Images/',2,2);
INSERT INTO folder VALUES (null, 'Chat','catWitness.jpg',2,1);
INSERT INTO folder VALUES (null, 'Text', 'Witness.txt',2,1);
INSERT INTO folder VALUES (null, 'Os', 'bone.jpg',3,3);

INSERT INTO item VALUES (null, 'Text',null,null,null,null,null,null,null,null,null,null,5);
INSERT INTO item VALUES (null, 'Chat',1,null,null,null,null,null,null,null,null,null,4);



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
	result INTEGER,
	game_id INTEGER,
	type_id INTEGER,
	FOREIGN KEY (type_id) REFERENCES type(type_id),
	FOREIGN KEY (game_id) REFERENCES game(game_id),
	FOREIGN KEY (result) REFERENCES item(item_id)
);*/