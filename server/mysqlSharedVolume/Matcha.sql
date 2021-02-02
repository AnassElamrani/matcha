CREATE DATABASE IF NOT EXISTS Matcha;

use Matcha;

CREATE TABLE IF NOT EXISTS users(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,`oauth_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL, `email` VARCHAR(255) NOT NULL, `userName` VARCHAR(255) NOT NULL, `firstName` VARCHAR(255) NOT NULL, `lastName` VARCHAR(255) NOT NULL, `password` VARCHAR(255) NOT NULL, `vkey` VARCHAR(255) NOT NULL, `verify` int(11) NOT NULL DEFAULT 0, `age` int(11), `gender` ENUM('Male', 'Women', 'Both'), `type` ENUM('Male', 'Women', 'Both'), `bio` VARCHAR(255));

CREATE TABLE IF NOT EXISTS tag(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `name` VARCHAR(255) NOT NULL);

CREATE TABLE IF NOT EXISTS tag_user(`id` int(11) NOT NULL AUTO_INCREMENT, `users_id` int(11) NOT NULL, `tag_id` int(11) NOT NULL, PRIMARY KEY (id), FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (tag_id) REFERENCES tag(id) ON DELETE CASCADE);

INSERT INTO `tag` (`name`)
VALUES ('#chess'),('#sport'),('#wine'),('#party');

CREATE TABLE IF NOT EXISTS imgProfil(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `users_id` int(11) NOT NULL, `image` VARCHAR(255) NOT NULL, `is_profil` int(11)  NOT NULL DEFAULT 0 ,FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS location(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `users_id` int(11) NOT NULL, `city` VARCHAR(255) NOT NULL, `lat` FLOAT(10, 6) NOT NULL , `long` FLOAT(10, 6 )  NOT NULL ,FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS likes(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `liker` int(11) NOT NULL, `liked` int(11) NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE IF NOT EXISTS matchs(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `liker` int(11) NOT NULL, `liked` int(11) NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)

-- if two users exist in colum liker move ito table matchs

-- calculate distance with help of sql in km

-- select ST_Distance_Sphere(point(32.882198333740234,-6.8979001045227051), point (32.85908 , -6.91352)) / 1000 AS km
-- to work with


-- SELECT u.userName, u.bio, ST_Distance_Sphere(point(32.882198333740234,-6.8979001045227051), point (l.lat , l.long)) / 1000 AS km from users as u INNER JOIN location as l on u.id = l.users_id



