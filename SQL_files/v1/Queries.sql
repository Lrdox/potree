/*SELECT * FROM item;

SELECT 			FROM expertise
JOIN item ON expertise.result_1 = item.item_id
WHERE

SELECT parent_id FROM folder
JOIN item ON folder.folder_id = item.file_directory;

SELECT item_id FROM item
JOIN item ON item.description = item.item_id;

SELECT path FROM folder
JOIN folder ON folder.parent_id = folder.folder_id;*/

/*SELECT parent_id FROM folder 
JOIN item ON folder.folder_id = item.file_directory 
WHERE folder.name = "chat";*/

SELECT CONCAT(folder_A.path, (SELECT path FROM folder JOIN item ON folder.folder_id = item.file_directory WHERE folder.name = "chat") )
FROM folder folder_A
WHERE folder_A.folder_id = (SELECT parent_id FROM folder
JOIN item ON folder.folder_id = item.file_directory
WHERE folder.name = "chat");

