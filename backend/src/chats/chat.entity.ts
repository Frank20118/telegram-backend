import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Message } from './message.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: 'private' | 'group' | 'channel';

  @Column({ nullable: true })
  title!: string;

  @ManyToMany(() => User, user => user.chats)
  @JoinTable()
  members!: User[];

  @OneToMany(() => Message, message => message.chat)
  messages!: Message[];
}
