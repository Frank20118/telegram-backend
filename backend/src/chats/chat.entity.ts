import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from './message.entity';
import { User } from '../users/user.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: 'private' | 'group' | 'channel';

  @Column()
  title!: string;

  @OneToMany(() => Message, message => message.chat)
  messages!: Message[];

  @Column('simple-array')
  members!: number[];
}
