import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { Message } from './message.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async createChat(type: string, title?: string, members?: number[]): Promise<Chat> {
    const chat = this.chatRepository.create({ type, title, members });
    return this.chatRepository.save(chat);
  }

  async sendMessage(chatId: number, senderId: number, content: string): Promise<Message> {
    const message = this.messageRepository.create({ chat: { id: chatId }, sender: { id: senderId }, content });
    return this.messageRepository.save(message);
  }
}
