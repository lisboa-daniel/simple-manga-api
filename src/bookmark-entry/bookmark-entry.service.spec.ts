import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkEntryService } from './bookmark-entry.service';

describe('BookmarkEntryService', () => {
  let service: BookmarkEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookmarkEntryService],
    }).compile();

    service = module.get<BookmarkEntryService>(BookmarkEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
