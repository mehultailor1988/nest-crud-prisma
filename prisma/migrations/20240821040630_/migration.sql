-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "CountryCode" TEXT NOT NULL,
    "Active" BOOLEAN NOT NULL,
    "SortSeq" INTEGER NOT NULL,
    "CountryName" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" TEXT NOT NULL,
    "StateCode" TEXT NOT NULL,
    "StateName" TEXT NOT NULL,
    "CountryCode" TEXT NOT NULL,
    "Active" BOOLEAN NOT NULL,
    "SortSeq" INTEGER NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "CityName" TEXT NOT NULL,
    "StateCode" TEXT NOT NULL,
    "CountryCode" TEXT NOT NULL,
    "Active" BOOLEAN NOT NULL,
    "SortSeq" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "City_CityName_key" ON "City"("CityName");
