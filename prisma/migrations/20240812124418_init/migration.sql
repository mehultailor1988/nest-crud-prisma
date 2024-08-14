/*
  Warnings:

  - You are about to drop the column `Countryname` on the `Country` table. All the data in the column will be lost.
  - Added the required column `CountryName` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Country" DROP COLUMN "Countryname",
ADD COLUMN     "CountryName" TEXT NOT NULL;
