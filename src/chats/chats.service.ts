import { Injectable } from '@nestjs/common';
import { Chat } from './chat.entity';

@Injectable()
export class ChatsService {
  private chats: Chat[] = [];

  async createChat(
    type: 'private' | 'group' | 'channel',
    title: string,
    members: number[]
  ): Promise<Chat> {
    const chat: Chat = {
      id: Date.now(),
      type,
      title,
      members,
      messages: []
    };
    this.chats.push(chat);
    return chat;
  }

  async getChatById(id: number): Promise<Chat | null> {
    return this.chats.find(c => c.id === Number(id)) ?? null;
  }
}
