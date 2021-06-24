import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Note extends Document {
  @Prop()
  title: string;

  @Prop()
  text: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
