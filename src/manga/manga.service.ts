import { Injectable } from '@nestjs/common';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';

import { PrismaService } from '../prisma/prisma.service';


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



  findOne(id: number) {
    return this.prisma.manga.findUnique({
      where: { id },
    });
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
