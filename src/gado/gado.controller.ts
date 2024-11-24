import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateGadoDto } from './dto/create-gado.dto';
import { UpdateGadoDto } from './dto/update-gado.dto';
import { VacinarGadoDto } from './dto/vacinar-gado.dto';
import { GadoService } from './gado.service';

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

  @Post('vacinar')
  async vacinar(@Body() vacinarGadoDto: VacinarGadoDto) {
    return this.gadoService.vacinarGado(vacinarGadoDto);
  }

  @Get(':id')
  async findByIdGado(@Param('id') id: string) {
    return this.gadoService.BuscarGadoPorId(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGadoDto: UpdateGadoDto) {
  //   return this.gadoService.update(+id, updateGadoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.gadoService.remove(+id);
  // }
}
