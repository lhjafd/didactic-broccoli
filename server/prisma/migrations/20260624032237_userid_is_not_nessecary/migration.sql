-- DropForeignKey
ALTER TABLE `combinations` DROP FOREIGN KEY `combinations_creator_fkey`;

-- DropForeignKey
ALTER TABLE `comments_combination` DROP FOREIGN KEY `comments_combination_userId_fkey`;

-- DropForeignKey
ALTER TABLE `comments_food` DROP FOREIGN KEY `comments_food_userId_fkey`;

-- DropForeignKey
ALTER TABLE `foods` DROP FOREIGN KEY `foods_creator_fkey`;

-- DropForeignKey
ALTER TABLE `tags` DROP FOREIGN KEY `tags_creator_fkey`;

-- DropIndex
DROP INDEX `combinations_creator_fkey` ON `combinations`;

-- DropIndex
DROP INDEX `comments_combination_userId_fkey` ON `comments_combination`;

-- DropIndex
DROP INDEX `comments_food_userId_fkey` ON `comments_food`;

-- DropIndex
DROP INDEX `foods_creator_fkey` ON `foods`;

-- DropIndex
DROP INDEX `tags_creator_fkey` ON `tags`;

-- AlterTable
ALTER TABLE `combinations` MODIFY `creator` CHAR(20) NULL;

-- AlterTable
ALTER TABLE `comments_combination` MODIFY `userId` CHAR(20) NULL;

-- AlterTable
ALTER TABLE `comments_food` MODIFY `userId` CHAR(20) NULL;

-- AlterTable
ALTER TABLE `foods` MODIFY `creator` CHAR(20) NULL;

-- AlterTable
ALTER TABLE `tags` MODIFY `creator` CHAR(20) NULL;

-- AddForeignKey
ALTER TABLE `foods` ADD CONSTRAINT `foods_creator_fkey` FOREIGN KEY (`creator`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `combinations` ADD CONSTRAINT `combinations_creator_fkey` FOREIGN KEY (`creator`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags` ADD CONSTRAINT `tags_creator_fkey` FOREIGN KEY (`creator`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments_food` ADD CONSTRAINT `comments_food_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments_combination` ADD CONSTRAINT `comments_combination_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
