import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkEntryController } from './bookmark-entry.controller';
import { BookmarkEntryService } from './bookmark-entry.service';

describe('BookmarkEntryController', () => {
  let controller: BookmarkEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookmarkEntryController],
      providers: [BookmarkEntryService],
    }).compile();

    controller = module.get<BookmarkEntryController>(BookmarkEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
