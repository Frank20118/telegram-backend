import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async register(createUserDto: CreateUserDto) {
    // Логика регистрации пользователя
    return { message: 'User registered' };
  }

  async login(phone: string, otp: string) {
    // Логика входа пользователя
    const token = this.jwtService.sign({ phone });
    return { access_token: token };
  }
}
