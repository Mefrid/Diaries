import { MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class DiaryDto {
  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  readonly title: string;
}
