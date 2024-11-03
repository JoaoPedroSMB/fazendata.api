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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.fazendaService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFazendaDto: UpdateFazendaDto) {
  //   return this.fazendaService.update(+id, updateFazendaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.fazendaService.remove(+id);
  // }
}
