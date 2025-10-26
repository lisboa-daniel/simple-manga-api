import { IsString, IsOptional } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  userId: string;

  @IsString()
  name: string;
}