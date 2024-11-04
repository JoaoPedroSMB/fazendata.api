/*
  Warnings:

  - You are about to drop the `Vacinas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnimalVacina" DROP CONSTRAINT "AnimalVacina_IdVacina_fkey";

-- DropTable
DROP TABLE "Vacinas";

-- CreateTable
CREATE TABLE "Vacina" (
    "IdVacina" SERIAL NOT NULL,
    "Descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "Vacina_pkey" PRIMARY KEY ("IdVacina")
);

-- AddForeignKey
ALTER TABLE "AnimalVacina" ADD CONSTRAINT "AnimalVacina_IdVacina_fkey" FOREIGN KEY ("IdVacina") REFERENCES "Vacina"("IdVacina") ON DELETE RESTRICT ON UPDATE CASCADE;
