// src/gado/gado-leiteiro.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CreateGadoDto } from './dto/create-gado.dto';

@Injectable()
export class GadoLeiteiroService {
  constructor(private readonly prisma: PrismaService) {}

  async createGadoLeiteiro(createGadoDto: CreateGadoDto) {
    const {
      ultimaInseminacao,
      quantidadePartos,
      producaoLeiteDiariaEmLitros,
      ...gadoData
    } = createGadoDto;

    // Cria o registro de gado básico
    const gado = await this.prisma.gado.create({
      data: gadoData,
    });

    switch (createGadoDto.tipoGado) {
      case TipoGado.REPRODUTOR:
        return this.gadoReprodutorService.createGadoReprodutor(createGadoDto);
      case TipoGado.LEITEIRO:
        await this.prisma.gadoLeiteiro.create({
          data: {
            IdGadoFemea: gado.IdGado,
            UltimaInseminacao: ultimaInseminacao,
            QuantidadePartos: quantidadePartos,
            ProducaoLeiteDiariaEmLitros: producaoLeiteDiariaEmLitros,
          },
        });
      case TipoGado.CORTE:
        return this.gadoCorteService.createGadoCorte(createGadoDto);
      default:
        throw new BadRequestException('Tipo de gado inválido');
    }

    return gado;
  }
}
