/*
  Warnings:

  - Added the required column `Nome` to the `Fazenda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Nome` to the `Gado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fazenda" ADD COLUMN     "Nome" VARCHAR(40) NOT NULL;

-- AlterTable
ALTER TABLE "Gado" ADD COLUMN     "Nome" VARCHAR(40) NOT NULL;
