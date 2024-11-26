import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CreateVacinaDto } from './dto/create-vacina.dto';

@Injectable()
export class VacinaService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createVacinaDto: CreateVacinaDto) {
    const { Nome, Descricao } = createVacinaDto;

    const vacina = this.prisma.vacina.create({
      data: {
        Nome,
        Descricao,
      },
    });

    return vacina;
  }

  async findVacinas() {
    return this.prisma.vacina.findMany();
  }
}
