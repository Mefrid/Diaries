import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiariesModule } from './diaries/diaries.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.sbbpy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    ),
    DiariesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
