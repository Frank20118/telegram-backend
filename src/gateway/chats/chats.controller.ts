import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  async createChat(@Body('type') type: string, @Body('title') title: string, @Body('members') members: number[]): Promise<Chat> {
    return this.chatsService.createChat(type, title, members);
  }

  @Post(':chatId/message')
  async sendMessage(
    @Param('chatId') chatId: number,
    @Body('senderId') senderId: number,
    @Body('content') content: string,
  ): Promise<Message> {
    return this.
