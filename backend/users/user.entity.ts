import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Chat } from '../chats/chat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  phone!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @ManyToMany(() => Chat, chat => chat.members)
  chats!: Chat[];
}
