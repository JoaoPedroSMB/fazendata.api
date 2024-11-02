-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tipoUsuarioIdTipoUsuario" INTEGER;

-- CreateTable
CREATE TABLE "Gado" (
    "IdGado" SERIAL NOT NULL,
    "IdTipoGado" INTEGER NOT NULL,
    "IdFazenda" INTEGER NOT NULL,
    "NumeroIdentificacao" INTEGER NOT NULL,
    "DataNascimento" TIMESTAMP(3) NOT NULL,
    "IdSexo" INTEGER NOT NULL,
    "PesoNascimentoEmKg" INTEGER NOT NULL,
    "PesoAtual" DECIMAL(5,2) NOT NULL,
    "IdRaca" INTEGER NOT NULL,

    CONSTRAINT "Gado_pkey" PRIMARY KEY ("IdGado")
);

-- CreateTable
CREATE TABLE "GadoMacho" (
    "IdGadoMacho" INTEGER NOT NULL,

    CONSTRAINT "GadoMacho_pkey" PRIMARY KEY ("IdGadoMacho")
);

-- CreateTable
CREATE TABLE "GadoFemea" (
    "IdGadoFemea" INTEGER NOT NULL,
    "IdStatusPrenhez" INTEGER NOT NULL,

    CONSTRAINT "GadoFemea_pkey" PRIMARY KEY ("IdGadoFemea")
);

-- CreateTable
CREATE TABLE "TipoGado" (
    "IdTipoGado" SERIAL NOT NULL,
    "TipoDoGado" VARCHAR(30) NOT NULL,

    CONSTRAINT "TipoGado_pkey" PRIMARY KEY ("IdTipoGado")
);

-- CreateTable
CREATE TABLE "GadoReprodutor" (
    "IdGadoMacho" INTEGER NOT NULL,
    "VolumeSemenDisponivel" TEXT NOT NULL,
    "Motilidade" DECIMAL(5,2) NOT NULL,
    "Concentracao" INTEGER NOT NULL,

    CONSTRAINT "GadoReprodutor_pkey" PRIMARY KEY ("IdGadoMacho")
);

-- CreateTable
CREATE TABLE "GadoLeiteiro" (
    "IdGadoFemea" INTEGER NOT NULL,
    "UltimaInseminacao" TIMESTAMP(3) NOT NULL,
    "QuantidadePartos" INTEGER NOT NULL,
    "ProducaoLeiteDiariaEmLitros" DECIMAL(4,2) NOT NULL,

    CONSTRAINT "GadoLeiteiro_pkey" PRIMARY KEY ("IdGadoFemea")
);

-- CreateTable
CREATE TABLE "GadoCorte" (
    "IdGadoMacho" INTEGER NOT NULL,
    "DataAbate" TIMESTAMP(3),
    "IdadePrevistaAbate" INTEGER NOT NULL,
    "GanhoDePesoMensal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "GadoCorte_pkey" PRIMARY KEY ("IdGadoMacho")
);

-- CreateTable
CREATE TABLE "Raca" (
    "IdRaca" SERIAL NOT NULL,
    "Nome" VARCHAR NOT NULL,

    CONSTRAINT "Raca_pkey" PRIMARY KEY ("IdRaca")
);

-- CreateTable
CREATE TABLE "Sexo" (
    "IdSexo" SERIAL NOT NULL,
    "Descricao" CHAR(10) NOT NULL,

    CONSTRAINT "Sexo_pkey" PRIMARY KEY ("IdSexo")
);

-- CreateTable
CREATE TABLE "StatusPrenhez" (
    "IdStatusPrenhez" SERIAL NOT NULL,
    "Descricao" CHAR(13) NOT NULL,

    CONSTRAINT "StatusPrenhez_pkey" PRIMARY KEY ("IdStatusPrenhez")
);

-- CreateTable
CREATE TABLE "TipoLogradouro" (
    "IdTipoLogradouro" SERIAL NOT NULL,
    "Descricao" VARCHAR(20) NOT NULL,

    CONSTRAINT "TipoLogradouro_pkey" PRIMARY KEY ("IdTipoLogradouro")
);

-- CreateTable
CREATE TABLE "UnidadeFederativa" (
    "UF" CHAR(2) NOT NULL,
    "NomeEstado" VARCHAR(18) NOT NULL,

    CONSTRAINT "UnidadeFederativa_pkey" PRIMARY KEY ("UF")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "IdEndereco" SERIAL NOT NULL,
    "Logradouro" VARCHAR(100) NOT NULL,
    "Complemento" VARCHAR(20),
    "Bairro" VARCHAR(50) NOT NULL,
    "CEP" INTEGER NOT NULL,
    "Numero" INTEGER NOT NULL,
    "Cidade" VARCHAR(30) NOT NULL,
    "IdTipoLogradouro" INTEGER NOT NULL,
    "UF" CHAR(2) NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("IdEndereco")
);

-- CreateTable
CREATE TABLE "TipoUsuario" (
    "IdTipoUsuario" SERIAL NOT NULL,
    "Descricao" VARCHAR(30) NOT NULL,

    CONSTRAINT "TipoUsuario_pkey" PRIMARY KEY ("IdTipoUsuario")
);

-- CreateTable
CREATE TABLE "Vacinas" (
    "IdVacina" SERIAL NOT NULL,
    "Descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "Vacinas_pkey" PRIMARY KEY ("IdVacina")
);

-- CreateTable
CREATE TABLE "Fazenda" (
    "IdFazenda" SERIAL NOT NULL,
    "IdEndereco" INTEGER NOT NULL,

    CONSTRAINT "Fazenda_pkey" PRIMARY KEY ("IdFazenda")
);

-- CreateTable
CREATE TABLE "Alimentao" (
    "IdGadoMacho" INTEGER NOT NULL,
    "DataInicioAlimentacao" TIMESTAMP(3) NOT NULL,
    "DataFimAlimentacao" TIMESTAMP(3),
    "QuantidadeRacaoDiaria" DOUBLE PRECISION NOT NULL,
    "Suplementacao" VARCHAR(100) NOT NULL,
    "TipoRacao" VARCHAR NOT NULL,

    CONSTRAINT "Alimentao_pkey" PRIMARY KEY ("IdGadoMacho","DataInicioAlimentacao")
);

-- CreateTable
CREATE TABLE "Projenitores" (
    "IdGado" INTEGER NOT NULL,
    "Sequencial" INTEGER NOT NULL,
    "IdSexo" INTEGER NOT NULL,
    "Nome" VARCHAR(40) NOT NULL,
    "IdRaca" INTEGER NOT NULL,

    CONSTRAINT "Projenitores_pkey" PRIMARY KEY ("IdGado","Sequencial","IdSexo")
);

-- CreateTable
CREATE TABLE "AnimalVacina" (
    "IdGado" INTEGER NOT NULL,
    "IdVacina" INTEGER NOT NULL,
    "DataAplicacao" TIMESTAMP(3) NOT NULL,
    "DataProxima" TIMESTAMP(3),

    CONSTRAINT "AnimalVacina_pkey" PRIMARY KEY ("IdGado","IdVacina")
);

-- CreateTable
CREATE TABLE "FazendaPessoa" (
    "IdPessoa" INTEGER NOT NULL,
    "IdFazenda" INTEGER NOT NULL,

    CONSTRAINT "FazendaPessoa_pkey" PRIMARY KEY ("IdPessoa","IdFazenda")
);

-- CreateTable
CREATE TABLE "Pessoa" (
    "IdPessoa" SERIAL NOT NULL,
    "Nome" VARCHAR(100) NOT NULL,
    "IdEndereco" INTEGER NOT NULL,
    "IdSexo" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("IdPessoa")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "IdPessoa" INTEGER NOT NULL,
    "IdTipoUsuario" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("IdPessoa")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tipoUsuarioIdTipoUsuario_fkey" FOREIGN KEY ("tipoUsuarioIdTipoUsuario") REFERENCES "TipoUsuario"("IdTipoUsuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gado" ADD CONSTRAINT "Gado_IdTipoGado_fkey" FOREIGN KEY ("IdTipoGado") REFERENCES "TipoGado"("IdTipoGado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gado" ADD CONSTRAINT "Gado_IdFazenda_fkey" FOREIGN KEY ("IdFazenda") REFERENCES "Fazenda"("IdFazenda") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gado" ADD CONSTRAINT "Gado_IdSexo_fkey" FOREIGN KEY ("IdSexo") REFERENCES "Sexo"("IdSexo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gado" ADD CONSTRAINT "Gado_IdRaca_fkey" FOREIGN KEY ("IdRaca") REFERENCES "Raca"("IdRaca") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GadoMacho" ADD CONSTRAINT "GadoMacho_IdGadoMacho_fkey" FOREIGN KEY ("IdGadoMacho") REFERENCES "Gado"("IdGado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GadoFemea" ADD CONSTRAINT "GadoFemea_IdGadoFemea_fkey" FOREIGN KEY ("IdGadoFemea") REFERENCES "Gado"("IdGado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GadoFemea" ADD CONSTRAINT "GadoFemea_IdStatusPrenhez_fkey" FOREIGN KEY ("IdStatusPrenhez") REFERENCES "StatusPrenhez"("IdStatusPrenhez") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GadoReprodutor" ADD CONSTRAINT "GadoReprodutor_IdGadoMacho_fkey" FOREIGN KEY ("IdGadoMacho") REFERENCES "GadoMacho"("IdGadoMacho") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GadoLeiteiro" ADD CONSTRAINT "GadoLeiteiro_IdGadoFemea_fkey" FOREIGN KEY ("IdGadoFemea") REFERENCES "GadoFemea"("IdGadoFemea") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GadoCorte" ADD CONSTRAINT "GadoCorte_IdGadoMacho_fkey" FOREIGN KEY ("IdGadoMacho") REFERENCES "GadoMacho"("IdGadoMacho") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_IdTipoLogradouro_fkey" FOREIGN KEY ("IdTipoLogradouro") REFERENCES "TipoLogradouro"("IdTipoLogradouro") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_UF_fkey" FOREIGN KEY ("UF") REFERENCES "UnidadeFederativa"("UF") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fazenda" ADD CONSTRAINT "Fazenda_IdEndereco_fkey" FOREIGN KEY ("IdEndereco") REFERENCES "Endereco"("IdEndereco") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alimentao" ADD CONSTRAINT "Alimentao_IdGadoMacho_fkey" FOREIGN KEY ("IdGadoMacho") REFERENCES "GadoCorte"("IdGadoMacho") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projenitores" ADD CONSTRAINT "Projenitores_IdGado_fkey" FOREIGN KEY ("IdGado") REFERENCES "Gado"("IdGado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projenitores" ADD CONSTRAINT "Projenitores_IdSexo_fkey" FOREIGN KEY ("IdSexo") REFERENCES "Sexo"("IdSexo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projenitores" ADD CONSTRAINT "Projenitores_IdRaca_fkey" FOREIGN KEY ("IdRaca") REFERENCES "Raca"("IdRaca") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalVacina" ADD CONSTRAINT "AnimalVacina_IdGado_fkey" FOREIGN KEY ("IdGado") REFERENCES "Gado"("IdGado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalVacina" ADD CONSTRAINT "AnimalVacina_IdVacina_fkey" FOREIGN KEY ("IdVacina") REFERENCES "Vacinas"("IdVacina") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FazendaPessoa" ADD CONSTRAINT "FazendaPessoa_IdPessoa_fkey" FOREIGN KEY ("IdPessoa") REFERENCES "Pessoa"("IdPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FazendaPessoa" ADD CONSTRAINT "FazendaPessoa_IdFazenda_fkey" FOREIGN KEY ("IdFazenda") REFERENCES "Fazenda"("IdFazenda") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_IdEndereco_fkey" FOREIGN KEY ("IdEndereco") REFERENCES "Endereco"("IdEndereco") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_IdSexo_fkey" FOREIGN KEY ("IdSexo") REFERENCES "Sexo"("IdSexo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_IdPessoa_fkey" FOREIGN KEY ("IdPessoa") REFERENCES "Pessoa"("IdPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_IdTipoUsuario_fkey" FOREIGN KEY ("IdTipoUsuario") REFERENCES "TipoUsuario"("IdTipoUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;
