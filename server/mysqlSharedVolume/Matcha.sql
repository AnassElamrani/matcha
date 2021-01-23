CREATE DATABASE IF NOT EXISTS Matcha;

use Matcha;

CREATE TABLE IF NOT EXISTS users(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,`oauth_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL, `email` VARCHAR(255) NOT NULL, `userName` VARCHAR(255) NOT NULL, `firstName` VARCHAR(255) NOT NULL, `lastName` VARCHAR(255) NOT NULL, `password` VARCHAR(255) NOT NULL, `vkey` VARCHAR(255) NOT NULL, `verify` int(11) NOT NULL DEFAULT 0, `gender` ENUM('Male', 'Women', 'Both'), `type` ENUM('Male', 'Women', 'Both'), `bio` VARCHAR(255));

CREATE TABLE IF NOT EXISTS tag(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `name` VARCHAR(255) NOT NULL);

CREATE TABLE IF NOT EXISTS tag_user(`id` int(11) NOT NULL AUTO_INCREMENT, `users_id` int(11) NOT NULL, `tag_id` int(11) NOT NULL, PRIMARY KEY (id), FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (tag_id) REFERENCES tag(id) ON DELETE CASCADE);

INSERT INTO `tag` (`name`)
VALUES ('#chess'),('#sport'),('#wine'),('#party');

CREATE TABLE IF NOT EXISTS imgProfil(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `users_id` int(11) NOT NULL, `image` VARCHAR(255) NOT NULL, `is_profil` int(11)  NOT NULL DEFAULT 0 ,FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE);
