import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', 
      database: 'data.sqlite',
      synchronize: true,
      autoLoadEntities: true
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
