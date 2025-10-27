import { Module } from '@nestjs/common';
import { BookmarkentryService } from './bookmarkentry.service';
import { BookmarkentryController } from './bookmarkentry.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BookmarkentryController],
  providers: [BookmarkentryService],
})
export class BookmarkentryModule {}
