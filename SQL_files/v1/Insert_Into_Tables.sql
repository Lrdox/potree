INSERT INTO folder VALUES (null, 'Witnesses','Witnesses/',1,null);
INSERT INTO folder VALUES (null, 'Objects','Objects/',1,null);
INSERT INTO folder VALUES (null, 'Images','Images/',2,2);
INSERT INTO folder VALUES (null, 'Chat','catWitness.jpg',2,1);
INSERT INTO folder VALUES (null, 'Text', 'Witness.txt',2,1);
INSERT INTO folder VALUES (null, 'Os', 'bone.jpg',3,3);

INSERT INTO item VALUES (null, 'Text',null,null,null,null,null,null,null,null,null,null,5);
INSERT INTO item VALUES (null, 'Chat',1,null,null,null,null,null,null,null,null,null,4);
/*INSERT INTO item VALUES (null, 'os',null,1,1,2,1,1,2,50,50,-50,6);

INSERT INTO expertise VALUES (null, 'type_1',150.5,'01:00:00',1,2,0,0);*/

-- CREATE TABLE folder (
-- folder_id INTEGER PRIMARY KEY,
-- name VARCHAR(200) NOT NULL,
-- path VARCHAR(200) NOT NULL,
-- level INTEGER,
-- parent_id INTEGER,
-- FOREIGN KEY (parent_id) REFERENCES folder(folder_id)
-- );
-- CREATE TABLE item (
-- item_id INTEGER PRIMARY KEY,
-- name VARCHAR(200) NOT NULL,
-- description INTEGER,
-- position_x FLOAT,
-- position_y FLOAT,
-- position_z FLOAT,
-- camera_target_x FLOAT,
-- camera_target_y FLOAT,
-- camera_target_z FLOAT,
-- camera_position_x FLOAT,
-- camera_position_y FLOAT,
-- camera_position_z FLOAT,
-- file_directory INTEGER,
-- FOREIGN KEY (description) REFERENCES item(item_id),
-- FOREIGN KEY (file_directory) REFERENCES folder(folder_id)
-- );
-- CREATE TABLE expertise (
-- expertise_id INTEGER PRIMARY KEY,
-- type VARCHAR(50) NOT NULL,
-- price FLOAT UNSIGNED,
-- duration TIME,
-- result_1 INTEGER,
-- result_2 INTEGER,
-- result_3 INTEGER,
-- result_4 INTEGER,
-- FOREIGN KEY (result_1) REFERENCES item(item_id),
-- FOREIGN KEY (result_2) REFERENCES item(item_id),
-- FOREIGN KEY (result_3) REFERENCES item(item_id),
-- FOREIGN KEY (result_4) REFERENCES item(item_id)
-- );