import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Chat } from '../chats/chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  sender: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}