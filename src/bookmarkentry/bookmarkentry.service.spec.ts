import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkentryService } from './bookmarkentry.service';

describe('BookmarkentryService', () => {
  let service: BookmarkentryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookmarkentryService],
    }).compile();

    service = module.get<BookmarkentryService>(BookmarkentryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
