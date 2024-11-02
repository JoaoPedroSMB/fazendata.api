/*
  Warnings:

  - You are about to drop the column `userId` on the `Pessoa` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pessoa" DROP CONSTRAINT "Pessoa_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_tipoUsuarioIdTipoUsuario_fkey";

-- AlterTable
ALTER TABLE "Pessoa" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
