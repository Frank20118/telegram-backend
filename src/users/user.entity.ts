import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Chat } from '../chats/chat.entity';
import { Message } from '../chats/message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @OneToMany(() => Chat, chat => chat.owner)
  chats: Chat[];

  @OneToMany(() => Message, message => message.sender)
  messages: Message[];
}

