import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookmarkEntryService } from './bookmark-entry.service';
import { CreateBookmarkEntryDto } from './dto/create-bookmark-entry.dto';
import { UpdateBookmarkEntryDto } from './dto/update-bookmark-entry.dto';

@Controller('api/bookmark-entry')
export class BookmarkEntryController {
  constructor(private readonly bookmarkEntryService: BookmarkEntryService) {}

  @Post()
  async create(@Body() createBookmarkEntryDto: CreateBookmarkEntryDto) {
    try {
      return this.bookmarkEntryService.create(createBookmarkEntryDto);
    } catch (err) {
      throw err;
    }
  }

  @Get()
  findAll() {
    return this.bookmarkEntryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.bookmarkEntryService.findOne(+id);
    } catch (err) {
      throw err;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookmarkEntryDto: UpdateBookmarkEntryDto) {
    return this.bookmarkEntryService.update(+id, updateBookmarkEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookmarkEntryService.remove(+id);
  }
}