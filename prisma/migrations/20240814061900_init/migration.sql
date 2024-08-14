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
CREATE UNIQUE INDEX "City_CityName_key" ON "City"("CityName");
