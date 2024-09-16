import { Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { PrismaService } from './shared/prisma/prisma.service';
import * as bcryptjs from "bcryptjs";
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
  imports: [AuthModule, PrismaModule ,ConfigModule.forRoot({ isGlobal: true })],

})

export class AppModule implements OnModuleInit{
  constructor(
    private readonly prisma:PrismaService,
    private readonly configService: ConfigService,
  ){}

  async onModuleInit() {
    const user = await this.prisma.user.findFirst({
      where:{
        email:this.configService.get<string>('LOGIN_ADM')
      }

    })

    if(!user){
      const creatUser = await this.prisma.user.create({
        data:{
          email: this.configService.get<string>('LOGIN_ADM'),
          password:await bcryptjs.hash(this.configService.get<string>('SENHA_ADM'),10)
        }
      })
      console.log(creatUser);
    }
  }
}
