/*
  Warnings:

  - You are about to alter the column `amount` on the `Bank` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Bank" ALTER COLUMN "amount" SET DATA TYPE INTEGER;
