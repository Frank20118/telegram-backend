import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ChatsService } from '../../chats/chats.service';
import { ChatType } from '../../chats/chat.entity';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  create(@Body('type') type: string, @Body('title') title: string) {
    return this.chatsService.createChat(type as ChatType, title);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.chatsService.getChatById(Number(id));
  }

  @Get('user/:userId')
  getUserChats(@Param('userId') userId: string) {
    return this.chatsService.getChatsByUserId(Number(userId));
  }
}
