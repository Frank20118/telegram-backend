import { Controller, Post, Body, Param } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Chat } from './chat.entity';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  // Создание нового чата
  @Post('create')
  async createChat(
    @Body('type') type: 'private' | 'group' | 'channel',
    @Body('title') title: string,
    @Body('members') members: number[]
  ): Promise<Chat> {
    return this.chatsService.createChat(type, title, members);
  }

  // Получение чата по ID
  @Post(':id')
  async getChat(@Param('id') id: number): Promise<Chat | undefined> {
    return this.chatsService.getChatById(id);
  }
}
