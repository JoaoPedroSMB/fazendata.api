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
}
