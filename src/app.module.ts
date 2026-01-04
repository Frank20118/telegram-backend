import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Chat } from './gateway/chats/chat.entity';
import { Message } from './gateway/chats/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Chat, Message],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
