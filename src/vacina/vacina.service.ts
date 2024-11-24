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

  // findAll() {
  //   return `This action returns all vacina`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} vacina`;
  // }

  // update(id: number, updateVacinaDto: UpdateVacinaDto) {
  //   return `This action updates a #${id} vacina`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} vacina`;
  // }
}
