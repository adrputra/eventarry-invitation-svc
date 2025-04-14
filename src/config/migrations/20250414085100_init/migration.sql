-- CreateTable
CREATE TABLE `User` (
    `userId` VARCHAR(8) NOT NULL,
    `fullName` VARCHAR(50) NOT NULL,
    `shortName` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `branchCode` VARCHAR(8) NOT NULL,
    `levelId` VARCHAR(3) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvitationCode` (
    `code` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(8) NOT NULL,
    `name` VARCHAR(255) NULL,
    `level` VARCHAR(255) NULL,
    `phoneNumber` VARCHAR(255) NULL,
    `status` VARCHAR(255) NULL,
    `pax` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
