/*
  Warnings:

  - You are about to alter the column `SortSeq` on the `Country` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Country" ALTER COLUMN "SortSeq" SET DATA TYPE INTEGER;
