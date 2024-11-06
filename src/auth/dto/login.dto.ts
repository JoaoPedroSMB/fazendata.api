import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
export class LoginResponseDto {
  IdPesoa: number;
  Nome: string;
  access_token: string;
}
