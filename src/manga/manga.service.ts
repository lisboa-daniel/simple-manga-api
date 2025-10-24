import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';

import { PrismaService } from '../prisma/prisma.service';
import { error } from 'console';
import { exitCode } from 'process';


@Injectable()
export class MangaService {
  constructor(private readonly prisma: PrismaService) {}
  create(createMangaDto: CreateMangaDto) {
    return this.prisma.manga.create({
      data: createMangaDto,
    });
  }

  async findAll() {
    return this.prisma.manga.findMany();
}



  async findOne(id: number) {
    const item = await this.prisma.manga.findUnique({
      where: { id },
    });

    if (!item) {
      throw  new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Object with Id ${id} does not exist`,
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    }

    return item;
  }

  update(id: number, updateMangaDto: UpdateMangaDto) {
    return this.prisma.manga.update({
      where: { id },
      data: updateMangaDto,
    });
  }

 async remove(id: number) {
    return await this.prisma.manga.delete({
      where: { id },
    });
  }
}
