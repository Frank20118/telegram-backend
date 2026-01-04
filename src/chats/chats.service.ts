import { Injectable } from '@nestjs/common';
import { Chat } from './chat.entity';
import { User } from '../users/user.entity';
import { Message } from './message.entity';

@Injectable()
export class ChatsService {
  private chats: Chat[] = []; // простой in-memory storage, для базы данных нужно заменить на репозиторий

  // Создание нового чата
  async createChat(
    type: 'private' | 'group' | 'channel',
    title: string,
    memberIds: number[],
  ): Promise<Chat> {
    const chat = new Chat();
    chat.id = this.chats.length + 1; // генерация ID, для базы данных используйте автоинкремент
    chat.type = type;
    chat.title = title;
    chat.members = memberIds.map((id) => {
      const user = new User();
      user.id = id;
      return user;
    });
    chat.messages = [];

    this.chats.push(chat);
    return chat;
  }

  // Получение всех чатов
  async getAllChats(): Promise<Chat[]> {
    return this.chats;
  }

  // Получение чата по ID
  async getChatById(id: number): Promise<Chat | undefined> {
    return this.chats.find((chat) => chat.id === id);
  }

  // Добавление сообщения в чат
  async addMessage(chatId: number, senderId: number, content: string): Promise<Message> {
    const chat = await this.getChatById(chatId);
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
