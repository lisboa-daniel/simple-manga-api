import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReadService } from './read.service';
import { CreateReadDto } from './dto/create-read.dto';
import { UpdateReadDto } from './dto/update-read.dto';

@Controller('read')
export class ReadController {
  constructor(private readonly readService: ReadService) {}

  @Post()
  create(@Body() createReadDto: CreateReadDto) {
    return this.readService.create(createReadDto);
  }

  @Get()
  findAll() {
    return this.readService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.readService.findOne(+id);
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
