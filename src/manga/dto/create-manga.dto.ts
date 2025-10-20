import { IsString, IsOptional } from 'class-validator';

export class CreateMangaDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  status: string;

  @IsString()
  tags: string[];

  @IsString()
  demographic: string;

  @IsString()
  serialization: string;

  @IsString()
  picture: string;

  @IsString()
  ISBN: string;

  @IsOptional()
  @IsString()
  synopsis?: string;

}