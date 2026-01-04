import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '../gateway/chats/chat.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatRepo: Repository<Chat>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createChat(
    type: 'private' | 'group' | 'channel',
    title: string,
    memberIds: number[],
  ): Promise<Chat> {
    const members = await this.userRepo.findByIds(memberIds);

    const chat = this.chatRepo.create({
      type,
      title,
      members,
    });

    return this.chatRepo.save(chat);
  }

  async getChatById(id: number): Promise<Chat | null> {
    return this.chatRepo.findOne({
      where: { id },
      relations: ['members', 'messages'],
    });
  }
}
