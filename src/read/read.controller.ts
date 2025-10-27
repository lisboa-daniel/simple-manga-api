import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReadService } from './read.service';
import { CreateReadDto } from './dto/create-read.dto';
import { UpdateReadDto } from './dto/update-read.dto';

@Controller('api/read')
export class ReadController {
  constructor(private readonly readService: ReadService) {}

  @Post()
  async create(@Body() createReadDto: CreateReadDto) {
    try {
      return await this.readService.create(createReadDto);
    } catch (err) {
      throw err;
    }
  }

  @Get()
  findAll() {
    return this.readService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.readService.findOne(+id);
    } catch (err) {
      throw err;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReadDto: UpdateReadDto) {
    return this.readService.update(+id, updateReadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.readService.remove(+id);
  }
}
