import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookmarkentryDto } from './dto/create-bookmarkentry.dto';
import { UpdateBookmarkentryDto } from './dto/update-bookmarkentry.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookmarkentryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookmarkentryDto: CreateBookmarkentryDto) {
    try {
      const bookmarkEntry = await this.prisma.bookmarkEntry.create({
        data: createBookmarkentryDto,
      });
      return bookmarkEntry;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Bookmark entry already exists');
        }
      }
      throw new InternalServerErrorException('Failed to create bookmark entry');
    }
  }

  async findAll() {
    return this.prisma.bookmarkEntry.findMany({
      include: {
        manga: true,
      },
    });
  }

  async findOne(id: number) {
    const entry = await this.prisma.bookmarkEntry.findUnique({
      where: { id },
      include: {
        manga: true,
      },
    });

    if (!entry) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Bookmark entry with Id ${id} does not exist`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return entry;
  }

  async update(id: number, updateBookmarkentryDto: UpdateBookmarkentryDto) {
    try {
      return await this.prisma.bookmarkEntry.update({
        where: { id },
        data: updateBookmarkentryDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Bookmark entry with Id ${id} not found`);
      }
      throw new InternalServerErrorException('Failed to update bookmark entry');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.bookmarkEntry.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Bookmark entry with Id ${id} not found`);
      }
      throw new InternalServerErrorException('Failed to delete bookmark entry');
    }
  }
}
