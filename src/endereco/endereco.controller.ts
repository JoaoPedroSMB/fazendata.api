import { Controller, Get, Param } from '@nestjs/common';
import { EnderecoService } from './endereco.service';

@Controller('endereco')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Get('estados')
  BuscarTodosEstados() {
    return this.enderecoService.BuscarTodosEstados();
  }

  @Get('tipo-logradouro')
  BuscarTiposLogradouro() {
    return this.enderecoService.BuscarTiposLogradouro();
  }

  @Get('todos')
  BuscarEnderecos() {
    return this.enderecoService.BuscarEnderecos();
  }

  @Get('/:enderecoId')
  BuscarEnderecoPorId(@Param('enderecoId') IdEndereco: string) {
    const id = parseInt(IdEndereco, 10);
    return this.enderecoService.BuscarEnderecoPorId(id);
  }
}
