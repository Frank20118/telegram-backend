import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: { email: string; username: string; password: string },
  ) {
    return this.authService.createUser(
      body.email,
      body.username,
      body.password,
    );
  }
}


