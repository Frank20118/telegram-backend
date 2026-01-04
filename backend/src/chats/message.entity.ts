import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Chat } from './chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  mediaUrl: string;

  @Column({ nullable: true })
  mediaType: 'image' | 'video' | 'document' | 'sticker' | 'gif';

  @Column({ nullable: true })
  selfDestructTime: number; // сек

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  sender: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
