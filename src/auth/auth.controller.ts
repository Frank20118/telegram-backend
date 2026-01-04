import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp')
  async sendOtp(@Body('phone') phone: string) {
    // Логика отправки OTP
    return { message: `OTP sent to ${phone}` };
  }

  @Post('verify')
  async verifyOtp(@Body() body: { phone: string; otp: string }) {
    // Логика проверки OTP и выдачи токена
    const user = await this.authService.validateUser(body.phone, body.otp);
    if (user) {
      return this.authService.login(user);
    }
    return { message: 'Invalid credentials' };
  }
}
