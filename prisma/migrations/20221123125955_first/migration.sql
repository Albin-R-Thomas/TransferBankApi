-- CreateTable
CREATE TABLE "Bank" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" BIGINT NOT NULL,
    "amount" BIGINT NOT NULL,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);
