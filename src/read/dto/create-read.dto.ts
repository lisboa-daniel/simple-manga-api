
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateReadDto {
    @IsString()
    userId: string;
    
    @IsInt()
    titleId: number;
    chaptersRead: number;
    volumesRead: number;

}

