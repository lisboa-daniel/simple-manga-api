import { isString, IsOptional, IsInt} from 'class-validator'

export class CreateBookmarkentryDto {

    @IsInt()
    listId : number;
    titleId : number;

   
}
