import { User } from '../users/user.entity';
import { Message } from './message.entity';

export class Chat {
  id!: number;
  type!: 'private' | 'group' | 'channel';
  title!: string;
  members!: User[];
  messages!: Message[];
}
