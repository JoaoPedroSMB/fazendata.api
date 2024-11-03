import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateVacinaDto } from './dto/create-vacina.dto';
import { VacinaService } from './vacina.service';

@Controller('vacina')
export class VacinaController {
  constructor(private readonly vacinaService: VacinaService) {}

  @Post()
  create(@Body() createVacinaDto: CreateVacinaDto) {
    return this.vacinaService.create(createVacinaDto);
  }

  @Get('/vacinas')
  findVacinas() {
    return this.vacinaService.findVacinas();
  }

  // @Get()
  // findAll() {
  //   return this.vacinaService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.vacinaService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVacinaDto: UpdateVacinaDto) {
  //   return this.vacinaService.update(+id, updateVacinaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.vacinaService.remove(+id);
  // }
}
