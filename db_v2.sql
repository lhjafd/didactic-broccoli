CREATE TABLE IF NOT EXISTS `users` (
	`id` CHAR(20) NOT NULL,
	`password` VARCHAR(255) NOT NULL,
	`created_at` TIMESTAMP NOT NULL,
	`removed_at` TIMESTAMP,
	PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `usernames` (
	`userId` CHAR(20) NOT NULL,
	`username` VARCHAR(80) NOT NULL,
	`created_at` TIMESTAMP NOT NULL,
	`removed_at` TIMESTAMP,
	`version` INTEGER NOT NULL DEFAULT 1,
	PRIMARY KEY(`userId`, `version`)
);

CREATE TABLE IF NOT EXISTS `nicknames` (
	`userId` CHAR(20) NOT NULL,
	`nickname` VARCHAR(255) NOT NULL,
	`created_at` TIMESTAMP NOT NULL,
	`removed_at` TIMESTAMP,
	`version` INTEGER NOT NULL DEFAULT 1,
	PRIMARY KEY(`userId`, `version`)
);

CREATE TABLE IF NOT EXISTS `foods` (
	`id` CHAR(15) NOT NULL,
	`creator` CHAR(20) NOT NULL,
	`created_at` TIMESTAMP NOT NULL,
	`removed_at` TIMESTAMP,
	PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `food_infos` (
	`foodId` CHAR(15) NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`description` TEXT NOT NULL,
	`price` INTEGER NOT NULL,
	`created_at` TIMESTAMP NOT NULL,
	`removed_at` TIMESTAMP,
	`version` INTEGER NOT NULL DEFAULT 1,
	PRIMARY KEY(`foodId`, `version`)
);

CREATE TABLE IF NOT EXISTS `combinations` (
	`id` CHAR(25) NOT NULL,
	`creator` CHAR(20) NOT NULL,
	`created_at` TIMESTAMP NOT NULL,
	`removed_at` TIMESTAMP,
	PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `combination_infos` (
	`combinationId` CHAR(25) NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`description` TEXT NOT NULL,
	`created_at` TIMESTAMP NOT NULL,
	`removed_at` TIMESTAMP,
	`version` INTEGER NOT NULL DEFAULT 1,
	PRIMARY KEY(`combinationId`, `version`)
);

CREATE TABLE IF NOT EXISTS `combination_foods` (
	`combinationId` CHAR(25) NOT NULL,
	`foodId` CHAR(15) NOT NULL,
	`updated_at` TIMESTAMP NOT NULL,
	`added_at` TIMESTAMP NOT NULL,
	`removed_at` TIMESTAMP,
	`version` INTEGER NOT NULL DEFAULT 1,
	PRIMARY KEY(`combinationId`, `foodId`, `version`)
);

CREATE TABLE IF NOT EXISTS `tags` (
	`id` CHAR(30) NOT NULL,
	`creator` CHAR(20) NOT NULL,
	`created_at` TIMESTAMP NOT NULL,
	`removed_at` TIMESTAMP,
	PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `tag_infos` (
	`tagId` CHAR(30) NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`description` TEXT NOT NULL,
	`created_at` TIMESTAMP NOT NULL,
	`removed_at` TIMESTAMP,
	`version` INTEGER NOT NULL DEFAULT 1,
	PRIMARY KEY(`tagId`, `version`)
);

CREATE TABLE IF NOT EXISTS `food_tags` (
	`foodId` CHAR(15) NOT NULL,
	`tagId` CHAR(30) NOT NULL,
	`updated_at` TIMESTAMP NOT NULL,
	`added_at` TIMESTAMP NOT NULL,
	`removed_at` TIMESTAMP,
	`version` INTEGER NOT NULL DEFAULT 1,
	PRIMARY KEY(`foodId`, `tagId`, `version`)
);

CREATE TABLE IF NOT EXISTS `combination_tags` (
	`combinationId` CHAR(25) NOT NULL,
	`tagId` CHAR(30) NOT NULL,
	`updated_at` TIMESTAMP NOT NULL,
	`added_at` TIMESTAMP NOT NULL,
	`removed_at` TIMESTAMP,
	`version` INTEGER NOT NULL DEFAULT 1,
	PRIMARY KEY(`combinationId`, `tagId`, `version`)
);

CREATE TABLE IF NOT EXISTS `comments_food` (
	`id` CHAR(40) NOT NULL,
	`userId` CHAR(20) NOT NULL,
	`foodId` CHAR(15) NOT NULL,
	`rating` DECIMAL(4, 2) NOT NULL CHECK (`rating` >= 0 AND `rating` <= 10),
	`reason` TEXT NOT NULL,
	`updated_at` TIMESTAMP NOT NULL,
	`created_at` TIMESTAMP NOT NULL,
	`removed_at` TIMESTAMP,
	`version` INTEGER NOT NULL DEFAULT 1,
	PRIMARY KEY(`id`, `version`)
);

CREATE TABLE IF NOT EXISTS `comments_combination` (
	`id` CHAR(40) NOT NULL,
	`userId` CHAR(20) NOT NULL,
	`combinationId` CHAR(25) NOT NULL,
	`rating` DECIMAL(4, 2) NOT NULL CHECK (`rating` >= 0 AND `rating` <= 10),
	`reason` TEXT NOT NULL,
	`updated_at` TIMESTAMP NOT NULL,
	`created_at` TIMESTAMP NOT NULL,
	`removed_at` TIMESTAMP,
	`version` INTEGER NOT NULL DEFAULT 1,
	PRIMARY KEY(`id`, `version`)
);


ALTER TABLE `usernames`
ADD FOREIGN KEY(`userId`) REFERENCES `users`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `nicknames`
ADD FOREIGN KEY(`userId`) REFERENCES `users`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `foods`
ADD FOREIGN KEY(`creator`) REFERENCES `users`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `food_infos`
ADD FOREIGN KEY(`foodId`) REFERENCES `foods`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `combinations`
ADD FOREIGN KEY(`creator`) REFERENCES `users`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `combination_infos`
ADD FOREIGN KEY(`combinationId`) REFERENCES `combinations`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `combination_foods`
ADD FOREIGN KEY(`combinationId`) REFERENCES `combinations`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `combination_foods`
ADD FOREIGN KEY(`foodId`) REFERENCES `foods`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `tags`
ADD FOREIGN KEY(`creator`) REFERENCES `users`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `tag_infos`
ADD FOREIGN KEY(`tagId`) REFERENCES `tags`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `food_tags`
ADD FOREIGN KEY(`foodId`) REFERENCES `foods`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `food_tags`
ADD FOREIGN KEY(`tagId`) REFERENCES `tags`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `combination_tags`
ADD FOREIGN KEY(`combinationId`) REFERENCES `combinations`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `combination_tags`
ADD FOREIGN KEY(`tagId`) REFERENCES `tags`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `comments_food`
ADD FOREIGN KEY(`userId`) REFERENCES `users`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `comments_food`
ADD FOREIGN KEY(`foodId`) REFERENCES `foods`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `comments_combination`
ADD FOREIGN KEY(`userId`) REFERENCES `users`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `comments_combination`
ADD FOREIGN KEY(`combinationId`) REFERENCES `combinations`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;