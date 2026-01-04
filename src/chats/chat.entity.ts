import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ChatsService } from './chats.service';


export type ChatType = 'private' | 'group' | 'channel';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  async createChat(
    @Body('type') type: string,
    @Body('title') title: string,
  ) {
    
    const chatType = type as ChatType;

    return this.chatsService.createChat(chatType, title);
  }

  @Get(':id')
  async getChat(@Param('id') id: string) {
    
    return this.chatsService.getChatById(id);
  }

  @Get('user/:userId')
  async getUserChats(@Param('userId') userId: string) {
    
    return this.chatsService.getChatsByUserId(userId.toString());
  }
}



