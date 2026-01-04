import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ChatsService } from '../../chats/chats.service';
import { ChatType } from '../../chats/chat.entity';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  create(
    @Body('type') type: string,
    @Body('title') title: string,
  ) {
    // Приводим к типу union
    const chatType: ChatType = type as ChatType;
    return this.chatsService.createChat(chatType, title);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    // Если ChatsService ожидает string — оставляем
    return this.chatsService.getChatById(id); 
    // Если ChatsService ожидает number — используем Number(id)
  }

  @Get('user/:userId')
  getUserChats(@Param('userId') userId: string) {
    // Приведение типа к number, если сервис требует
    const uid = Number(userId);
    return this.chatsService.getChatsByUserId(uid);
  }
}
