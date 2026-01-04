import { Injectable } from '@nestjs/common';
import { Chat, ChatType } from './chat.entity';

@Injectable()
export class ChatsService {
  private chats: Chat[] = [];

  createChat(type: ChatType, title: string, userId: number): Chat {
    const chat = new Chat(
      (this.chats.length + 1).toString(),
      type,
      title,
      userId
    );
    this.chats.push(chat);
    return chat;
  }

  getChatById(id: string): Chat | undefined {
    return this.chats.find(c => c.id === id);
  }

  getChatsByUserId(userId: number): Chat[] {
    return this.chats.filter(c => c.userId === userId);
  }
}
