import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CreateFazendaDto } from './dto/create-fazenda.dto';

@Injectable()
export class FazendaService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createFazendaDto: CreateFazendaDto) {
    const { IdEndereco, Nome, IdPessoa } = createFazendaDto;

    if (!IdPessoa) {
      throw new BadRequestException(
        `A pessoa com o ID ${createFazendaDto.IdPessoa} não existe.`,
      );
    }

    if (!IdEndereco) {
      throw new BadRequestException(
        `O endereço com ID ${createFazendaDto.IdEndereco} não existe.`,
      );
    }

    const fazendaData = await this.prisma.fazenda.create({
      data: {
        IdEndereco,
        Nome,
      },
    });
    await this.prisma.fazendaPessoa.create({
      data: {
        IdPessoa,
        IdFazenda: fazendaData.IdFazenda,
      },
    });

    const fazenda = await this.prisma.fazenda.findUnique({
      where: { IdFazenda: fazendaData.IdFazenda },
    });

    return fazenda;
  }

  async BuscarTodasFazendas(idPessoa: number) {
    return this.prisma.fazenda.findMany({
      where: {
        FazendaPessoa: {
          some: {
            IdPessoa: idPessoa,
          },
        },
      },
    });
  }

  // update(id: number, updateFazendaDto: UpdateFazendaDto) {
  //   return `This action updates a #${id} fazenda`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} fazenda`;
  // }
}
