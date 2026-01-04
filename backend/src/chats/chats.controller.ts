import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Chat } from './chat.entity';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  async createChat(
    @Body('type') type: 'private' | 'group' | 'channel',
    @Body('title') title: string,
    @Body('members') members: number[],
  ): Promise<Chat> {
    return this.chatsService.createChat(type, title, members);
  }

  @Get(':id')
  async getChatById(@Param('id') id: number): Promise<Chat | undefined> {
    return this.chatsService.getChatById(Number(id));
  }
}
