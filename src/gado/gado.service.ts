import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CreateGadoDto } from './dto/create-gado.dto';
import { UpdateGadoDto } from './dto/update-gado.dto';
import { VacinarGadoDto } from './dto/vacinar-gado.dto';

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
          throw new BadRequestException('Gado Leiteiro deve ser fêmea');
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
  async update(id: number | string, updateGadoDto: UpdateGadoDto) {
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
    } = updateGadoDto;

    const numericId = Number(id);
    if (isNaN(numericId)) {
      throw new BadRequestException('ID deve ser um número válido.');
    }

    console.log('ID recebido para atualização:', numericId);

    const exitegado = await this.prisma.gado.findUnique({
      where: { IdGado: numericId },
    });
    if (!exitegado) {
      throw new BadRequestException(`Gado com ID ${numericId} não encontrado.`);
    }

    const updatedGado = await this.prisma.gado.update({
      where: { IdGado: numericId },
      data: {
        ...gadoData,
        IdTipoGado,
        IdSexo,
      },
    });

    if (IdTipoGado === 1) {
      // Gado leiteiro
      if (IdSexo !== 2) {
        throw new BadRequestException('Gado Leiteiro deve ser feminino');
      }

      if (IdStatusPrenhez) {
        const statusPrenhez = await this.prisma.statusPrenhez.findUnique({
          where: { IdStatusPrenhez },
        });
        if (!statusPrenhez) {
          throw new BadRequestException(
            `Status Prenhez com ID ${IdStatusPrenhez} não existe.`,
          );
        }
        await this.prisma.gadoFemea.update({
          where: { IdGadoFemea: numericId },
          data: { IdStatusPrenhez },
        });
      }

      await this.prisma.gadoLeiteiro.update({
        where: { IdGadoFemea: numericId },
        data: {
          UltimaInseminacao: ultimaInseminacao,
          QuantidadePartos: quantidadePartos,
          ProducaoLeiteDiariaEmLitros: producaoLeiteDiariaEmLitros,
        },
      });
    } else if (IdTipoGado === 2) {
      // Gado de corte
      if (IdSexo !== 1) {
        throw new BadRequestException('Gado de Corte deve ser masculino');
      }

      await this.prisma.gadoCorte.update({
        where: { IdGadoMacho: numericId },
        data: {
          DataAbate: dataAbate,
          IdadePrevistaAbate: idadePrevistaAbate,
          GanhoDePesoMensal: ganhoDePesoMensal,
        },
      });
    } else if (IdTipoGado === 3) {
      // Gado reprodutor
      if (IdSexo !== 1) {
        throw new BadRequestException('Gado Reprodutor deve ser masculino');
      }

      await this.prisma.gadoReprodutor.update({
        where: { IdGadoMacho: numericId },
        data: {
          VolumeSemenDisponivel: volumeSemenDisponivel,
          Motilidade: motilidade,
          Concentracao: concentracao,
        },
      });
    } else {
      throw new BadRequestException('Tipo de gado inválido.');
    }

    return updatedGado;
  }

  async BuscarAnimalPorFazenda(fazendaId: number) {
    return this.prisma.gado.findMany({
      where: {
        IdFazenda: fazendaId,
      },
      include: {
        Sexo: true,
        TipoGado: true,
        Raca: true,
      },
    });
  }

  async vacinarGado(vacinarGadoDto: VacinarGadoDto) {
    const { IdGado, IdVacina, DataAplicacao, DataProxima } = vacinarGadoDto;

    const vacina = await this.prisma.vacina.findUnique({
      where: { IdVacina },
    });

    if (!vacina) {
      throw new BadRequestException(`Vacina com ID ${IdVacina} não existe.`);
    }

    const gado = await this.prisma.gado.findUnique({
      where: { IdGado },
    });

    if (!gado) {
      throw new BadRequestException(`Gado com ID ${IdGado} não existe.`);
    }

    return this.prisma.animalVacina.create({
      data: {
        IdGado: gado.IdGado,
        IdVacina: vacina.IdVacina,
        DataAplicacao,
        DataProxima,
      },
    });
  }
  async BuscarGadoPorId(gadoId: number) {
    const gado = await this.prisma.gado.findUnique({
      where: {
        IdGado: gadoId,
      },
      select: {
        IdTipoGado: true,
      },
    });

    if (!gado) {
      throw new BadRequestException(`Gado com ID ${gadoId} não encontrado.`);
    }

    let includeAuxiliar: any = {};

    switch (gado.IdTipoGado) {
      case 1: // Gado Leiteiro
        includeAuxiliar = {
          GadoFemea: {
            include: {
              GadoLeiteiro: true,
              StatusPrenhez: true,
            },
          },
        };
        break;

      case 2: // Gado de Corte
        includeAuxiliar = {
          GadoMacho: {
            include: {
              GadoCorte: true,
            },
          },
        };
        break;

      case 3: // Gado Reprod
        includeAuxiliar = {
          GadoMacho: {
            include: {
              GadoReprodutor: true,
            },
          },
        };
        break;

      default:
        throw new BadRequestException('Tipo de gado inválido.');
    }

    return this.prisma.gado.findUnique({
      where: {
        IdGado: gadoId,
      },
      include: { Sexo: true, TipoGado: true, Raca: true, ...includeAuxiliar },
    });
  }
  async BuscarVacinasPorGado(gadoId: number) {
    return this.prisma.animalVacina.findMany({
      where: {
        IdGado: gadoId,
      },
    });
  }
}
