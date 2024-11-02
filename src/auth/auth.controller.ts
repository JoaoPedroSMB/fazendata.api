import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    const usuario = await this.authService.validateUsuario(
      loginDto.email,
      loginDto.password,
    );
    if (!usuario) {
      throw new BadRequestException('Invalid credentials');
    }
    return this.authService.login(usuario);
  }
}
