import { PartialType } from '@nestjs/mapped-types';
import { CreateBookmarkEntryDto } from './create-bookmark-entry.dto';

export class UpdateBookmarkEntryDto extends PartialType(CreateBookmarkEntryDto) {}