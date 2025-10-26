import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateBookmarkEntryDto {
  @IsInt()
  bookmarkId: number;

  @IsInt()
  mangaId: number;

  @IsOptional()
  @IsInt()
  lastChapterRead?: number;
}