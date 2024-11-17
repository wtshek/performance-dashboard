-- CreateTable
CREATE TABLE "Test" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);
