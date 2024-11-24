import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateGadoDto } from './dto/create-gado.dto';
import { GadoService } from './gado.service';
import { UpdateGadoDto } from './dto/update-gado.dto';

@Controller('gado')
export class GadoController {
  constructor(private readonly gadoService: GadoService) {}

  @Post()
  async create(@Body() createGadoDto: CreateGadoDto) {
    return this.gadoService.create(createGadoDto);
  }
  @Patch(':id')
  async update(
    @Param('id') id: number, // O ID vem da rota
    @Body() updateGadoDto: UpdateGadoDto, // O corpo contém apenas os campos que podem ser alterados
  ) {
    return this.gadoService.update(id, updateGadoDto);
  }

  @Get('fazenda/:fazendaId')
  async findByFazendaId(@Param('fazendaId') fazendaId: string) {
    const id = parseInt(fazendaId, 10);
    return this.gadoService.BuscarAnimalPorFazenda(id);
  }
  @Get(':GadoId')
  async BuscarAnimalPorFazenda(@Param('GadoId') GadoId: string) {
    const id = parseInt(GadoId, 10);
    return this.gadoService.BuscarGadoPorId(id);
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
