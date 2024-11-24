import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { LoginResponseDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUsuario(email: string, password: string): Promise<any> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
      select: {
        IdPessoa: true,
        email: true,
        password: true,
        IdTipoUsuario: true,
        Pessoa: {
          select: {
            Nome: true,
          },
        },
      },
    });
    if (usuario && (await bcrypt.compare(password, usuario.password))) {
      const { password, ...result } = usuario;
      return result;
    }
    return null;
  }

  async login(usuario: any): Promise<LoginResponseDto> {
    const payload = { email: usuario.email, sub: usuario.IdPessoa };
    return {
      IdPessoa: usuario.IdPessoa,
      nome: usuario.Pessoa.Nome,
      access_token: this.jwtService.sign(payload),
    };
  }
}
