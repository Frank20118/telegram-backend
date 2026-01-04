import { Controller, Get, Query, Patch, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('search')
  async search(@Query('q') query: string) {
    return this.usersService.searchByUsername(query);
  }

  @Patch('username')
  async changeUsername(@Body() body: { userId: number; newUsername: string }) {
    return this.usersService.updateUsername(body.userId, body.newUsername);
  }
}
