import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MangaService } from './manga.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('api/manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @Post()
  async create(@Body() createMangaDto: CreateMangaDto) {

    try {
      return this.mangaService.create(createMangaDto);
    } catch (err) {
      throw err;
    }
    
  }

  @Get()
  findAll() {
    return this.mangaService.findAll();
  }

  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    
    try {
      return await this.mangaService.findOne(+id);
    } catch (err) {
      throw err;
    }
         
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMangaDto: UpdateMangaDto) {
    
    return this.mangaService.update(+id, updateMangaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mangaService.remove(+id);
  }
}
