import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { GadoService } from './gado.service';
import { CreateGadoDto } from './dto/create-gado.dto';

@Controller('gado')
export class GadoController {
  constructor(private readonly gadoService: GadoService) {}

  @Post()
  async create(@Body() createGadoDto: CreateGadoDto) {
    return this.gadoService.create(createGadoDto);
  }

  @Get('fazenda/:fazendaId')
  async findByFazendaId(@Param('fazendaId') fazendaId: string) {
    const id = parseInt(fazendaId, 10);
    return this.gadoService.BuscarAnimalPorFazenda(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.gadoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGadoDto: UpdateGadoDto) {
  //   return this.gadoService.update(+id, updateGadoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.gadoService.remove(+id);
  // }
}
