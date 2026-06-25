/*
  Warnings:

  - You are about to alter the column `file_size` on the `File` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "File" ALTER COLUMN "file_size" SET DATA TYPE INTEGER;
