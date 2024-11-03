import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as bcryptjs from 'bcryptjs';
import { AuthModule } from './auth/auth.module';
import { FazendaModule } from './fazenda/fazenda.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { PrismaService } from './shared/prisma/prisma.service';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    FazendaModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const user = await this.prisma.user.findFirst({
      where: {
        email: this.configService.get<string>('LOGIN_ADM'),
      },
    });

    if (!user) {
      const creatUser = await this.prisma.user.create({
        data: {
          email: this.configService.get<string>('LOGIN_ADM'),
          password: await bcryptjs.hash(
            this.configService.get<string>('SENHA_ADM'),
            10,
          ),
        },
      });
      console.log(creatUser);
    }
  }
}
