import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkentryController } from './bookmarkentry.controller';
import { BookmarkentryService } from './bookmarkentry.service';

describe('BookmarkentryController', () => {
  let controller: BookmarkentryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookmarkentryController],
      providers: [BookmarkentryService],
    }).compile();

    controller = module.get<BookmarkentryController>(BookmarkentryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
