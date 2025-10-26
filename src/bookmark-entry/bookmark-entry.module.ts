import { Module } from '@nestjs/common';
import { BookmarkEntryService } from './bookmark-entry.service';
import { BookmarkEntryController } from './bookmark-entry.controller';

@Module({
  controllers: [BookmarkEntryController],
  providers: [BookmarkEntryService],
})
export class BookmarkEntryModule {}
