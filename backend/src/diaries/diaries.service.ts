import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiaryDto } from './dto/diary.dto';
import { NoteDto } from './dto/note.dto';
import { Diary } from './schemas/diary.schema';
import { Note } from './schemas/note.schema';

@Injectable()
export class DiariesService {
  constructor(
    @InjectModel(Diary.name) private diaryModel: Model<Diary>,
    @InjectModel(Note.name) private noteModel: Model<Note>,
  ) {}

  async getAllDiaries(): Promise<Diary[]> {
    return this.diaryModel.find().exec();
  }

  async getDiary(id: string) {
    return this.diaryModel.findById(id).exec();
  }

  async createDiary(diaryDto: DiaryDto): Promise<Diary> {
    const newDiary = new this.diaryModel(diaryDto);
    return newDiary.save();
  }

  async changeDiary(diaryDto: DiaryDto, id: string) {
    return this.diaryModel
      .findByIdAndUpdate(id, diaryDto, {
        new: true,
      })
      .exec();
  }

  async deleteDiary(id: string) {
    return this.diaryModel.findByIdAndDelete(id).exec();
  }

  async createNote(noteDto: NoteDto, diaryId: string) {
    let newNote = new this.noteModel(noteDto);
    newNote = await newNote.save();
    const diary = await this.getDiary(diaryId);
    diary.notes.push(newNote);
    return diary.save();
  }

  async getNote(noteId: string) {
    const diaries = await this.diaryModel.find().exec();
    return diaries
      .flatMap((diary) => diary.notes)
      .find((note) => String(note._id) === noteId);
  }

  async getNotesByDiaryId(diaryId: string) {
    const diary = await this.getDiary(diaryId);
    if (diary === null) {
      throw new NotFoundException();
    } else {
      return diary.notes;
    }
  }

  async deleteNote(noteId: string) {
    let diaries = await this.getAllDiaries();
    let diary = diaries.find((diary) =>
      diary.notes.find((note) => String(note._id) === noteId),
    );
    diary.notes = diary.notes.filter((note) => String(note._id) !== noteId);
    return diary.save();
  }

  async changeNote(noteDto: NoteDto, noteId: string) {
    let diaries = await this.getAllDiaries();
    let diary = diaries.find((diary) =>
      diary.notes.find((note) => String(note._id) === noteId),
    );
    diary.notes = diary.notes.map((note) => {
      if (String(note._id) === noteId) {
        note.title = noteDto.title;
        note.text = noteDto.text;
        return note;
      } else {
        return note;
      }
    });
    return diary.save();
  }
}
