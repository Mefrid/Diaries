import { MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class NoteDto {
  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @MaxLength(256)
  readonly text: string;
}
