SELECT path FROM game WHERE version = (SELECT MAX(version) from game);

SELECT item_A.file_directory FROM item item_A, item item_B, link WHERE item_A.item_id = link.result and item_B.item_id = link.item;

SELECT item_A.file_directory FROM item item_A, item item_B WHERE item_A.item_id = item_B.description; -- description

-- SELECT position_x,position_y,position_z,camera_target_x,camera_target_y,camera_target_z,camera_position_x,camera_position_y,camera_position_z FROM item WHERE item_id ="' + dir + '";' -- Request coords
-- SELECT file_directory FROM item WHERE name = ; -- item path
-- SELECT item_A.file_directory FROM item item_A, item item_B, link WHERE item_A.item_id = link.result and item_B.item_id = link.item and item_B.name = "' + req.params.pageDir + '"; -- item path on link