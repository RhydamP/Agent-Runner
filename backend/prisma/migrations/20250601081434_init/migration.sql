-- CreateTable
CREATE TABLE "Run" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "tool" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "tokenUsage" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Run_pkey" PRIMARY KEY ("id")
);
