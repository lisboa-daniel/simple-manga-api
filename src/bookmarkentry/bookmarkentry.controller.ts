import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookmarkentryService } from './bookmarkentry.service';
import { CreateBookmarkentryDto } from './dto/create-bookmarkentry.dto';
import { UpdateBookmarkentryDto } from './dto/update-bookmarkentry.dto';

@Controller('api/bookmarkentry')
export class BookmarkentryController {
  constructor(private readonly bookmarkentryService: BookmarkentryService) {}

  @Post()
  async create(@Body() createBookmarkentryDto: CreateBookmarkentryDto) {
    try {
      return await this.bookmarkentryService.create(createBookmarkentryDto);
    } catch (err) {
      throw err;
    }
  }

  @Get()
  findAll() {
    return this.bookmarkentryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.bookmarkentryService.findOne(+id);
    } catch (err) {
      throw err;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookmarkentryDto: UpdateBookmarkentryDto) {
    return this.bookmarkentryService.update(+id, updateBookmarkentryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookmarkentryService.remove(+id);
  }
}
