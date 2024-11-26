import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateFazendaDto } from './dto/create-fazenda.dto';
import { FazendaService } from './fazenda.service';

@Controller('fazenda')
export class FazendaController {
  constructor(private readonly fazendaService: FazendaService) {}

  @Post()
  async create(@Body() createFazendaDto: CreateFazendaDto) {
    return this.fazendaService.create(createFazendaDto);
  }

  @Get('pessoa/:pessoaId')
  async findFazendas(@Param('pessoaId') pessoaId: string) {
    const id = parseInt(pessoaId, 10);
    return this.fazendaService.BuscarTodasFazendas(id);
  }
}
