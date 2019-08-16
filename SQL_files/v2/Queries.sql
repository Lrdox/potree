-- SELECT CONCAT(folder_A.path, (SELECT path FROM folder JOIN item ON folder.folder_id = item.file_directory WHERE folder.name = "chat") )
-- FROM folder folder_A
-- WHERE folder_A.folder_id = (SELECT parent_id FROM folder
-- JOIN item ON folder.folder_id = item.file_directory
-- WHERE folder.name = "chat");

