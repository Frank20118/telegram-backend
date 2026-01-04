import { Controller, Get, Param } from '@nestjs/common';
import { ChatsService } from '../../chats/chats.service';

@Controller('gateway/chats')
export class GatewayChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get('user/:userId')
  getUserChats(@Param('userId') userId: string) {
    return this.chatsService.getChatsByUserId(Number(userId));
  }
}
