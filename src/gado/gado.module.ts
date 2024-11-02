import { Module } from '@nestjs/common';
import { GadoService } from './gado.service';
import { GadoController } from './gado.controller';

@Module({
  controllers: [GadoController],
  providers: [GadoService],
})
export class GadoModule {}
