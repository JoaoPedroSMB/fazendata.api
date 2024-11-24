import { IsString } from 'class-validator';

export class CreateVacinaDto {
  @IsString()
  Nome: string;
  @IsString()
  Descricao: string;
}
