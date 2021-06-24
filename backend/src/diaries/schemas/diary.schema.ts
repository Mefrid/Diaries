import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Note, NoteSchema } from './note.schema';

@Schema({ timestamps: true })
export class Diary extends Document {
  @Prop()
  title: string;

  @Prop({ type: [NoteSchema], default: [] })
  notes: Note[];
}

export const DiarySchema = SchemaFactory.createForClass(Diary);
