import { IsInt, IsString } from 'class-validator';

export class CreateFazendaDto {
  @IsInt()
  IdEndereco: number;
  @IsInt()
  IdDono: number;

  @IsString()
  Nome: string;

  @IsInt()
  IdPessoa: number;
}
