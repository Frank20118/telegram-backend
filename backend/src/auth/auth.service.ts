import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async register(createUserDto: CreateUserDto): Promise<{ message: string }> {
    // Здесь логика сохранения пользователя
    return { message: 'User registered successfully' };
  }

  async login(phone: string, otp: string): Promise<{ access_token: string } | { message: string }> {
    // Здесь логика проверки OTP
    const token = this.jwtService.sign({ phone });
    return { access_token: token };
  }
}
