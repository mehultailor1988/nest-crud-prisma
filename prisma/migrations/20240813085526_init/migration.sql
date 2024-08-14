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
