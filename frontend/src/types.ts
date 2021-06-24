export interface MongoDbDocument {
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
}

export interface Diary extends MongoDbDocument {
  title: string;
  notes: Note[];
}

export interface DiaryDto {
  readonly title: Diary['title'];
}

export interface Note extends MongoDbDocument {
  title: string;
  text: string;
}

export interface NoteDto {
  readonly title: Note['title'];
  readonly text?: Note['text'];
}
