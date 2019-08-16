CREATE TABLE folder (
	folder_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(200) NOT NULL,
	path VARCHAR(200) NOT NULL,
	level INTEGER,
	parent_id INTEGER,
	FOREIGN KEY (parent_id) REFERENCES folder(folder_id)
);
CREATE TABLE item (
	item_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(200) NOT NULL,
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
	file_directory INTEGER NOT NULL,
	FOREIGN KEY (description) REFERENCES item(item_id),
	FOREIGN KEY (file_directory) REFERENCES folder(folder_id)
);
CREATE TABLE expertise (
	expertise_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	type VARCHAR(50) NOT NULL,
	price FLOAT UNSIGNED,
	duration TIME,
	result_1 INTEGER,
	result_2 INTEGER,
	result_3 INTEGER,
	result_4 INTEGER,
	FOREIGN KEY (result_1) REFERENCES item(item_id),
	FOREIGN KEY (result_2) REFERENCES item(item_id),
	FOREIGN KEY (result_3) REFERENCES item(item_id),
	FOREIGN KEY (result_4) REFERENCES item(item_id)
);
