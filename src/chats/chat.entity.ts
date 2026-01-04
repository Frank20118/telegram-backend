import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinTable
} from 'typeorm';
import { User } from '../users/user.entity';
import { Message } from './message.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: 'private' | 'group' | 'channel';

  @Column()
  title!: string;

  @ManyToOne(() => User, user => user.chats)
  owner!: User;

  @ManyToMany(() => User)
  @JoinTable()
  members!: User[];

  @OneToMany(() => Message, message => message.chat)
  messages!: Message[];
}


