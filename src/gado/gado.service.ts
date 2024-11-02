import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CreateGadoDto } from './dto/create-gado.dto';

@Injectable()
export class GadoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGadoDto: CreateGadoDto) {
    const {
      IdTipoGado,
      IdSexo,
      ultimaInseminacao,
      quantidadePartos,
      producaoLeiteDiariaEmLitros,
      dataAbate,
      idadePrevistaAbate,
      ganhoDePesoMensal,
      volumeSemenDisponivel,
      motilidade,
      concentracao,
      IdStatusPrenhez,
      ...gadoData
    } = createGadoDto;
    // Tenho que ver uma maneira melhor de fazer essas verificações tmj
    const tipoGado = await this.prisma.tipoGado.findUnique({
      where: { IdTipoGado: createGadoDto.IdTipoGado },
    });
    if (!tipoGado) {
      throw new BadRequestException(
        `Tipo de gado com ID ${createGadoDto.IdTipoGado} não existe.`,
      );
    }

    const fazenda = await this.prisma.fazenda.findUnique({
      where: { IdFazenda: createGadoDto.IdFazenda },
    });
    if (!fazenda) {
      throw new BadRequestException(
        `Fazenda com ID ${createGadoDto.IdFazenda} não existe.`,
      );
    }

    const sexo = await this.prisma.sexo.findUnique({
      where: { IdSexo: createGadoDto.IdSexo },
    });
    if (!sexo) {
      throw new BadRequestException(
        `Sexo com ID ${createGadoDto.IdSexo} não existe.`,
      );
    }

    const raca = await this.prisma.raca.findUnique({
      where: { IdRaca: createGadoDto.IdRaca },
    });
    if (!raca) {
      throw new BadRequestException(
        `Raça com ID ${createGadoDto.IdRaca} não existe.`,
      );
    }

    const gado = await this.prisma.gado.create({
      data: {
        ...gadoData,
        IdTipoGado,
        IdFazenda: createGadoDto.IdFazenda,
        IdSexo,
        IdRaca: createGadoDto.IdRaca,
      },
    });

    switch (IdTipoGado) {
      case 1: // Gado leiteiro
        if (IdSexo !== 2) {
          throw new BadRequestException('Gado Leiteiro deve ser feminino');
        }
        const StatusPrenhez = await this.prisma.statusPrenhez.findUnique({
          where: { IdStatusPrenhez: createGadoDto.IdStatusPrenhez },
        });
        if (!StatusPrenhez) {
          throw new BadRequestException(
            `Status Prenhez com ID ${createGadoDto.IdStatusPrenhez} não existe.`,
          );
        }
        const gadoFemea = await this.prisma.gadoFemea.create({
          data: {
            IdGadoFemea: gado.IdGado,
            IdStatusPrenhez: IdStatusPrenhez,
          },
        });
        await this.prisma.gadoLeiteiro.create({
          data: {
            IdGadoFemea: gadoFemea.IdGadoFemea,
            UltimaInseminacao: ultimaInseminacao,
            QuantidadePartos: quantidadePartos,
            ProducaoLeiteDiariaEmLitros: producaoLeiteDiariaEmLitros,
          },
        });
        break;

      case 2: // Gado de corte
        if (IdSexo !== 1) {
          throw new BadRequestException('Gado de Corte deve ser masculino');
        }
        const gadoMachoCorte = await this.prisma.gadoMacho.create({
          data: {
            IdGadoMacho: gado.IdGado,
          },
        });
        await this.prisma.gadoCorte.create({
          data: {
            IdGadoMacho: gadoMachoCorte.IdGadoMacho,
            DataAbate: dataAbate,
            IdadePrevistaAbate: idadePrevistaAbate,
            GanhoDePesoMensal: ganhoDePesoMensal,
          },
        });
        break;

      case 3: // Gado Reprod
        if (IdSexo !== 1) {
          throw new BadRequestException('Gado Reprodutor deve ser masculino');
        }
        const gadoMachoReprodutor = await this.prisma.gadoMacho.create({
          data: {
            IdGadoMacho: gado.IdGado,
          },
        });
        await this.prisma.gadoReprodutor.create({
          data: {
            IdGadoMacho: gadoMachoReprodutor.IdGadoMacho,
            VolumeSemenDisponivel: volumeSemenDisponivel,
            Motilidade: motilidade,
            Concentracao: concentracao,
          },
        });
        break;

      default:
        throw new BadRequestException('Tipo de gado inválido');
    }

    return gado;
  }

  async BuscarAnimalPorFazenda(fazendaId: number) {
    return this.prisma.gado.findMany({
      where: {
        IdFazenda: fazendaId,
      },
    });
  }
}
