import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MangaModule } from './manga/manga.module';
import { UserModule } from './user/user.module';
import { ReadModule } from './read/read.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { BookmarkentryModule } from './bookmarkentry/bookmarkentry.module';



@Module({
  imports: [PrismaModule, MangaModule, UserModule, ReadModule, BookmarkModule, BookmarkentryModule, BookmarkentryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
