-- CreateTable
CREATE TABLE `users` (
    `id` CHAR(20) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `removed_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refresh_tokens` (
    `id` CHAR(35) NOT NULL,
    `userId` CHAR(20) NOT NULL,
    `token` VARCHAR(512) NOT NULL,
    `login_ip` VARCHAR(40) NOT NULL,
    `expire_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usernames` (
    `userId` CHAR(20) NOT NULL,
    `username` VARCHAR(80) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `removed_at` DATETIME(3) NULL,
    `version` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`userId`, `version`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nicknames` (
    `userId` CHAR(20) NOT NULL,
    `nickname` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `removed_at` DATETIME(3) NULL,
    `version` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`userId`, `version`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `foods` (
    `id` CHAR(15) NOT NULL,
    `creator` CHAR(20) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `removed_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food_infos` (
    `foodId` CHAR(15) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `price` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `removed_at` DATETIME(3) NULL,
    `version` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`foodId`, `version`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `combinations` (
    `id` CHAR(25) NOT NULL,
    `creator` CHAR(20) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `removed_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `combination_infos` (
    `combinationId` CHAR(25) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `removed_at` DATETIME(3) NULL,
    `version` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`combinationId`, `version`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `combination_foods` (
    `combinationId` CHAR(25) NOT NULL,
    `foodId` CHAR(15) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `added_at` DATETIME(3) NOT NULL,
    `removed_at` DATETIME(3) NULL,
    `version` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`combinationId`, `foodId`, `version`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` CHAR(30) NOT NULL,
    `creator` CHAR(20) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `removed_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tag_infos` (
    `tagId` CHAR(30) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `removed_at` DATETIME(3) NULL,
    `version` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`tagId`, `version`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food_tags` (
    `foodId` CHAR(15) NOT NULL,
    `tagId` CHAR(30) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `added_at` DATETIME(3) NOT NULL,
    `removed_at` DATETIME(3) NULL,
    `version` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`foodId`, `tagId`, `version`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `combination_tags` (
    `combinationId` CHAR(25) NOT NULL,
    `tagId` CHAR(30) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `added_at` DATETIME(3) NOT NULL,
    `removed_at` DATETIME(3) NULL,
    `version` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`combinationId`, `tagId`, `version`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments_food` (
    `id` CHAR(40) NOT NULL,
    `userId` CHAR(20) NOT NULL,
    `foodId` CHAR(15) NOT NULL,
    `rating` DECIMAL(5, 3) NOT NULL,
    `reason` TEXT NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `removed_at` DATETIME(3) NULL,
    `version` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments_combination` (
    `id` CHAR(40) NOT NULL,
    `userId` CHAR(20) NOT NULL,
    `combinationId` CHAR(25) NOT NULL,
    `rating` DECIMAL(5, 3) NOT NULL,
    `reason` TEXT NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `removed_at` DATETIME(3) NULL,
    `version` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `refresh_tokens` ADD CONSTRAINT `refresh_tokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usernames` ADD CONSTRAINT `usernames_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nicknames` ADD CONSTRAINT `nicknames_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `foods` ADD CONSTRAINT `foods_creator_fkey` FOREIGN KEY (`creator`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `food_infos` ADD CONSTRAINT `food_infos_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `foods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `combinations` ADD CONSTRAINT `combinations_creator_fkey` FOREIGN KEY (`creator`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `combination_infos` ADD CONSTRAINT `combination_infos_combinationId_fkey` FOREIGN KEY (`combinationId`) REFERENCES `combinations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `combination_foods` ADD CONSTRAINT `combination_foods_combinationId_fkey` FOREIGN KEY (`combinationId`) REFERENCES `combinations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `combination_foods` ADD CONSTRAINT `combination_foods_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `foods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags` ADD CONSTRAINT `tags_creator_fkey` FOREIGN KEY (`creator`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tag_infos` ADD CONSTRAINT `tag_infos_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `food_tags` ADD CONSTRAINT `food_tags_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `foods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `food_tags` ADD CONSTRAINT `food_tags_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `combination_tags` ADD CONSTRAINT `combination_tags_combinationId_fkey` FOREIGN KEY (`combinationId`) REFERENCES `combinations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `combination_tags` ADD CONSTRAINT `combination_tags_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments_food` ADD CONSTRAINT `comments_food_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments_food` ADD CONSTRAINT `comments_food_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `foods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments_combination` ADD CONSTRAINT `comments_combination_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments_combination` ADD CONSTRAINT `comments_combination_combinationId_fkey` FOREIGN KEY (`combinationId`) REFERENCES `combinations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
