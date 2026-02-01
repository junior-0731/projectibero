/*
  Warnings:

  - You are about to drop the column `date` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `email` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "date",
ADD COLUMN     "email" TEXT NOT NULL;
