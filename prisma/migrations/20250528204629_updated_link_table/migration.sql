/*
  Warnings:

  - Added the required column `name` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL;
