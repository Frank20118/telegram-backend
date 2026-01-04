import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Chat } from '../chats/chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @ManyToOne(() => Chat, chat => chat.messages)
  chat!: Chat;

  @CreateDateColumn()
  createdAt!: Date;
}
