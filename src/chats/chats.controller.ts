import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Chat } from './chat.entity';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  createChat(
    @Body('type') type: 'private' | 'group' | 'channel',
    @Body('title') title: string,
    @Body('members') members: number[]
  ): Promise<Chat> {
    return this.chatsService.createChat(type, title, members);
  }

  @Get(':id')
  getChat(@Param('id') id: number): Promise<Chat | null> {
    return this.chatsService.getChatById(id);
  }
}
