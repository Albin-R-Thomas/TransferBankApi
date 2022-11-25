/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Bank` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,email]` on the table `Bank` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Bank" DROP COLUMN "createdAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Bank_name_email_key" ON "Bank"("name", "email");
