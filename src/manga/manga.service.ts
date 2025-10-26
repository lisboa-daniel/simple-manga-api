import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';

import { PrismaService } from '../prisma/prisma.service';
import { error } from 'console';
import { exitCode } from 'process';
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';


@Injectable()
export class MangaService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMangaDto: CreateMangaDto) {
    try {
      // Make sure to await the Prisma call
      const manga = await this.prisma.manga.create({
        data: createMangaDto,
      });

      return manga;

    } catch (error) {
      // Prisma has specific error codes you can check
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Example: unique constraint violation
        if (error.code === 'P2002') {
          throw new BadRequestException('Manga with same title already exists');
        }
      }

      // Fallback: throw a generic 500 error
      throw new InternalServerErrorException('Failed to create manga');
    }
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
