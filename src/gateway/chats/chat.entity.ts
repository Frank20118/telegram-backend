import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { Message } from './message.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: 'private' | 'group' | 'channel';

  @Column()
  title!: string;

  @ManyToMany(() => User)
  @JoinTable()
  members!: User[];

  @OneToMany(() => Message, (message: Message) => message.chat)
  messages!: Message[];

  constructor(type: 'private' | 'group' | 'channel', title: string, members: User[]) {
    this.type = type;
    this.title = title;
    this.members = members;
  }
}
