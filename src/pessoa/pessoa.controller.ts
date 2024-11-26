import { Controller, Get, Param } from '@nestjs/common';
import { PessoaService } from './pessoa.service';

@Controller('pessoas')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Get()
  async findPessoas() {
    return this.pessoaService.findPessoas();
  }

  @Get(':pessoaId')
  async findPessoa(@Param('pessoaId') pessoaId: number) {
    return this.pessoaService.findPessoaPorId(+pessoaId);
  }
}
