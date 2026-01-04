import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { Chat } from './chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @Column({ nullable: true })
  mediaUrl?: string;

  @Column({ nullable: true })
  mediaType?: string;

  @Column({ nullable: true })
  selfDestructTime?: number;

  @ManyToOne(() => User)
  sender!: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat!: Chat;

  @CreateDateColumn()
  createdAt!: Date;

  constructor(content: string, sender: User, chat: Chat) {
    this.content = content;
    this.sender = sender;
    this.chat = chat;
  }
}
