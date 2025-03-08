-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Surat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jenis_surat` VARCHAR(191) NOT NULL,
    `nomor_surat` VARCHAR(191) NOT NULL,
    `tgl_surat` DATETIME(3) NOT NULL,
    `tgl_dikirim` DATETIME(3) NOT NULL,
    `pengirim` VARCHAR(191) NOT NULL,
    `penerima` VARCHAR(191) NOT NULL,
    `perihal` VARCHAR(191) NOT NULL,
    `lampiran` VARCHAR(191) NOT NULL,
    `status` ENUM('diproses', 'selesai', 'arsip') NOT NULL DEFAULT 'diproses',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
