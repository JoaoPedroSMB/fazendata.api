import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional } from 'class-validator';

export class VacinarGadoDto {
  @IsInt()
  IdGado: number;

  @IsInt()
  IdVacina: number;

  @Type(() => Date)
  @IsDate()
  DataAplicacao: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  DataProxima?: Date;
}
