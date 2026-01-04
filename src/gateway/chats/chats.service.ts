import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { Message } from './message.entity';
import { User } from '../../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async createChat(type: 'private' | 'group' | 'channel', title: string, members: User[]): Promise<Chat> {
    const chat = this.chatRepository.create({ type, title, members });
    return this.chatRepository.save(chat);
  }

  async sendMessage(content: string, sender: User, chat: Chat): Promise<Message> {
    const message = this.messageRepository.create({ content, sender, chat });
    return this.messageRepository.save(message);
  }

  async getChatById(id: number): Promise<Chat | undefined> {
    return this.chatRepository.findOne({
      where: { id },
      relations: ['members', 'messages'],
    });
  }
}
