import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookmarkEntryDto } from './dto/create-bookmark-entry.dto';
import { UpdateBookmarkEntryDto } from './dto/update-bookmark-entry.dto';
import { PrismaService } from '../prisma/prisma.service';
import { error } from 'console';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookmarkEntryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookmarkEntryDto: CreateBookmarkEntryDto) {
    try {
      const bookmarkEntry = await this.prisma.bookmarkEntry.create({
        data: createBookmarkEntryDto,
      });
      return bookmarkEntry;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('BookmarkEntry already exists');
        }
      }
      throw new InternalServerErrorException('Failed to create bookmark entry');
    }
  }

  async findAll() {
    return this.prisma.bookmarkEntry.findMany();
  }

  async findOne(id: number) {
    const item = await this.prisma.bookmarkEntry.findUnique({
      where: { id },
    });
    if (!item) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Object with Id ${id} does not exist`,
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    }
    return item;
  }

  update(id: number, updateBookmarkEntryDto: UpdateBookmarkEntryDto) {
    return this.prisma.bookmarkEntry.update({
      where: { id },
      data: updateBookmarkEntryDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.bookmarkEntry.delete({
      where: { id },
    });
  }
}