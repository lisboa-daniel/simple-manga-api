import { PartialType } from '@nestjs/swagger';
import { CreateBookmarkentryDto } from './create-bookmarkentry.dto';

export class UpdateBookmarkentryDto extends PartialType(CreateBookmarkentryDto) {}
