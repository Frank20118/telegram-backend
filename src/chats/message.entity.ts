export type ChatType = 'private' | 'group' | 'channel';

export class Chat {
  id: string;
  type: ChatType;
  title: string;
  userId: number;

  constructor(id: string, type: ChatType, title: string, userId: number) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.userId = userId;
  }
}

