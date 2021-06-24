import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiariesController } from './diaries.controller';
import { DiariesService } from './diaries.service';
import { Diary, DiarySchema } from './schemas/diary.schema';
import { Note, NoteSchema } from './schemas/note.schema';

@Module({
  controllers: [DiariesController],
  providers: [DiariesService],
  imports: [
    MongooseModule.forFeature([{ name: Diary.name, schema: DiarySchema }]),
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
})
export class DiariesModule {}
