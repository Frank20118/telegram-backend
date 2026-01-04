import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Chat } from './chat.entity';
import { User } from '../users/user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @Column({ nullable: true })
  mediaUrl!: string;

  @Column({ nullable: true })
  mediaType!: string;

  @Column({ nullable: true })
  selfDestructTime!: number;

  @ManyToOne(() => User)
  sender!: User;

  @ManyToOne(() => Chat, chat => chat.messages)
  chat!: Chat;

  @Column()
  createdAt!: Date;
}
