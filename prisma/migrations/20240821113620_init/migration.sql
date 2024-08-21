/*
  Warnings:

  - You are about to drop the `Auth` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Auth";

-- CreateTable
CREATE TABLE "Token" (
    "tokenid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("tokenid")
);
