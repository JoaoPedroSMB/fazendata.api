import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateFazendaDto } from './dto/create-fazenda.dto';
import { UpdateFazendaDto } from './dto/update-fazenda.dto';
import { FazendaService } from './fazenda.service';

@Controller('fazenda')
export class FazendaController {
  constructor(private readonly fazendaService: FazendaService) {}

  @Post()
  create(@Body() createFazendaDto: CreateFazendaDto) {
    return this.fazendaService.create(createFazendaDto);
  }

  @Get()
  findAll() {
    return this.fazendaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fazendaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFazendaDto: UpdateFazendaDto) {
    return this.fazendaService.update(+id, updateFazendaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fazendaService.remove(+id);
  }
}
