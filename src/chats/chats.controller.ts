import { Controller, Post, Body } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  async createChat(
    @Body('type') type: string,
    @Body('title') title: string,
    @Body('members') members: number[],
  ) {
    return this.chatsService.createChat(type, title, members);
  }
}
