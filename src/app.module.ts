import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MangaModule } from './manga/manga.module';
import { UserModule } from './user/user.module';
import { ReadModule } from './read/read.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { BookmarkEntryModule } from './bookmark-entry/bookmark-entry.module';


@Module({
  imports: [PrismaModule, MangaModule, UserModule, ReadModule, BookmarkModule, BookmarkEntryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
