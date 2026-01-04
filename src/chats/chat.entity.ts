import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Message } from './message.entity';

export type ChatType = 'private' | 'group' | 'channel';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  type: ChatType;

  @Column({ nullable: true })
  title: string;

  @ManyToOne(() => User, user => user.chats, { eager: true })
  owner: User;

  @OneToMany(() => Message, message => message.chat)
  messages: Message[];
}



