import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { DiariesService } from './diaries.service';
import { DiaryDto } from './dto/diary.dto';
import { NoteDto } from './dto/note.dto';

@Controller()
export class DiariesController {
  constructor(private readonly diariesService: DiariesService) {}

  @Get('/diaries')
  async getAllDiaries() {
    return this.diariesService.getAllDiaries();
  }

  @Get('/diaries/:diaryId')
  async getDiary(@Param('diaryId') id: string) {
    const diary = await this.diariesService.getDiary(id);
    if (diary) {
      return diary;
    } else {
      throw new NotFoundException();
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/diaries')
  async createDiary(@Body() diaryDto: DiaryDto) {
    return this.diariesService.createDiary(diaryDto);
  }

  @Put('/diaries/:diaryId')
  async changeDiary(
    @Body() diaryDto: DiaryDto,
    @Param('diaryId') diaryId: string,
  ) {
    return this.diariesService.changeDiary(diaryDto, diaryId);
  }

  @Delete('/diaries/:diaryId')
  async deleteDiary(@Param('diaryId') diaryId: string) {
    return this.diariesService.deleteDiary(diaryId);
  }

  @Post('/diaries/:diaryId/notes')
  async createNote(
    @Body() noteDto: NoteDto,
    @Param('diaryId') diaryId: string,
  ) {
    return this.diariesService.createNote(noteDto, diaryId);
  }

  @Get('/diaries/:diaryId/notes/')
  async getNotesByDiaryId(@Param('diaryId') diaryId: string) {
    const notes = await this.diariesService.getNotesByDiaryId(diaryId);
    if (notes) {
      return notes;
    } else {
      throw new NotFoundException();
    }
  }

  @Get('/notes/:noteId')
  async getNote(@Param('noteId') noteId: string) {
    const note = await this.diariesService.getNote(noteId);
    if (note) {
      return note;
    } else {
      throw new NotFoundException();
    }
  }

  @Delete('/notes/:noteId')
  async deleteNote(@Param('noteId') noteId: string) {
    return this.diariesService.deleteNote(noteId);
  }

  @Put('/notes/:noteId')
  async changeNote(@Body() noteDto: NoteDto, @Param('noteId') noteId: string) {
    return this.diariesService.changeNote(noteDto, noteId);
  }
}
