import { Injectable } from '@nestjs/common';
import { CreateFazendaDto } from './dto/create-fazenda.dto';
import { UpdateFazendaDto } from './dto/update-fazenda.dto';

@Injectable()
export class FazendaService {
  create(createFazendaDto: CreateFazendaDto) {
    return 'This action adds a new fazenda';
  }

  findAll() {
    return `This action returns all fazenda`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fazenda`;
  }

  update(id: number, updateFazendaDto: UpdateFazendaDto) {
    return `This action updates a #${id} fazenda`;
  }

  remove(id: number) {
    return `This action removes a #${id} fazenda`;
  }
}
