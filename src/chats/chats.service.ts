import { Injectable } from '@nestjs/common';
import { Chat } from './chat.entity';
import { User } from '../users/user.entity';
import { Message } from './message.entity';

@Injectable()
export class ChatsService {
  private chats: Chat[] = [];

  async createChat(
    type: 'private' | 'group' | 'channel',
    title: string,
    memberIds: number[]
  ): Promise<Chat> {
    const chat = new Chat();
    chat.id = this.chats.length + 1;
    chat.type = type;
    chat.title = title;
    chat.members = memberIds.map(id => {
      const user = new User();
      user.id = id;
      return user;
    });
    chat.messages = [];
    this.chats.push(chat);
    return chat;
  }

  async getChatById(chatId: number): Promise<Chat | undefined> {
    return this.chats.find(c => c.id === chatId);
  }

  async addMessage(chatId: number, message: Message): Promise<Message> {
    const chat = await this.getChatById(chatId);
    if (!chat) throw new Error('Chat not found');
    chat.messages.push(message);
    return message;
  }
}

