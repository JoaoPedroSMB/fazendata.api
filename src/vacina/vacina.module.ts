import { Module } from '@nestjs/common';
import { VacinaService } from './vacina.service';
import { VacinaController } from './vacina.controller';

@Module({
  controllers: [VacinaController],
  providers: [VacinaService],
})
export class VacinaModule {}
