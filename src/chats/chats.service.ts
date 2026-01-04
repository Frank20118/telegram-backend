import { Injectable } from '@nestjs/common';
import { Chat } from './chat.entity';
import { User } from '../users/user.entity';
import { Message } from './message.entity';

@Injectable()
export class ChatsService {
  private chats: Chat[] = [];

  async createChat(type: string, title: string, members: number[]): Promise<Chat> {
    const chat = new Chat();
    chat.id = this.chats.length + 1;
    chat.type = type as 'private' | 'group' | 'channel';
    chat.title = title;
    chat.members = members.map(id => ({ id } as User));
    chat.messages = [];
    this.chats.push(chat);
    return chat;
  }

  async addMessage(chatId: number, senderId: number, content: string): Promise<Message> {
    const chat = this.chats.find(c => c.id === chatId);
    if (!chat) throw new Error('Chat not found');

    const message = new Message();
    message.id = chat.messages.length + 1;
    message.content = content;
    message.sender = { id: senderId } as User;
    message.chat = chat;
    message.createdAt = new Date();
    chat.messages.push(message);

    return message;
  }
}


