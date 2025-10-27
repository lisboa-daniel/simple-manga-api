import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Controller('api/bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  async create(@Body() createBookmarkDto: CreateBookmarkDto) {
    try {
      return this.bookmarkService.create(createBookmarkDto);
    } catch (err) {
      throw err;
    }
  }

  @Get()
  findAll() {
    return this.bookmarkService.findAll();
  }

  
  @Get('/user/:id')
  findAllByUserId(@Param('id') id : string) {
    return this.bookmarkService.findAllByUserId(id);
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.bookmarkService.findOne(+id);
    } catch (err) {
      throw err;
    }
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookmarkDto: UpdateBookmarkDto) {
    return this.bookmarkService.update(+id, updateBookmarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookmarkService.remove(+id);
  }
}