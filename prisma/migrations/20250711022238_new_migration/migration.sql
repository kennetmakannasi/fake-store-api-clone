/*
  Warnings:

  - You are about to drop the column `itemId` on the `cart` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_itemId_fkey`;

-- DropIndex
DROP INDEX `Cart_itemId_fkey` ON `cart`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `itemId`,
    ADD COLUMN `productId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
