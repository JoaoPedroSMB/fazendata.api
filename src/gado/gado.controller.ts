import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateGadoDto } from './dto/create-gado.dto';
import { VacinarGadoDto } from './dto/vacinar-gado.dto';
import { GadoService } from './gado.service';

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

  @Post('vacinar/')
  async crete(@Body() vacinarGadoDto: VacinarGadoDto) {
    return this.gadoService.vacinarGado(vacinarGadoDto);
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
