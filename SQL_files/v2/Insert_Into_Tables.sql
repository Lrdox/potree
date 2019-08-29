INSERT INTO game VALUES (null,1,'../../../Resources/');

INSERT INTO item VALUES (null, 'Text', 'witnesses/Witness.txt',null,null,null,null,null,null,null,null,null,null,1,-1);
INSERT INTO item VALUES (null, 'Chat', 'witnesses/catWitness.jpg',1,null,null,null,null,null,null,null,null,null,1,-1);
INSERT INTO item VALUES (null, 'Parapluie', 'objects/Parapluie.jpg',null,1.8130750061998846,0.5102250023851854,-42.594600023364016,-0.4711485689551521,0.9642796405605881,-41.80158542714902,-0.46769350873643023,0.9615723418118935,-41.80324462335793,1,1);
INSERT INTO item VALUES (null, 'Pièce ID', 'objects/Pièce ID.jpg',null,-1.016424993323279,-0.5495250081052317,-42.501600028609225,1.3135239275955681,-0.5737131900905573,-40.90926515381219,-0.3185042348809164,0.4549750378072951,-41.60342505691628,1,1);
INSERT INTO item VALUES (null, 'Tasse', 'objects/Tasse.jpg',null,-0.06201874809165107,1.1125999980936516,-42.27188124913473,-0.042978932286130846,0.5365771904208398,-42.091947661561335,-0.009749692902740033,0.725937269590419,-42.17173918951856,1,1);

INSERT INTO type VALUES (null, 'Expertise',null,null,1);

INSERT INTO link VALUES (null, 'Text', 2, 1, 1, 1);
INSERT INTO link VALUES (null, 'Pièce ID', 4, 2, 1, 1);

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