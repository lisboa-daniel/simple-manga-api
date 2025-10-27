import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { PrismaService } from '../prisma/prisma.service';
import { error } from 'console';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookmarkService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookmarkDto: CreateBookmarkDto) {
    try {
      const bookmark = await this.prisma.bookmark.create({
        data: createBookmarkDto,
      });
      return bookmark;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Bookmark with same name already exists');
        }
      }
      throw new InternalServerErrorException('Failed to create bookmark');
    }
  }

  async findAll() {
    return this.prisma.bookmark.findMany();
  }

  async findOne(id: number) {
    const item = await this.prisma.bookmark.findUnique({
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

  async findAllByUserId(userId: string) {
    const items = await this.prisma.bookmark.findMany({
      where: { userId }, 
    });
  
    if (!items || items.length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `No bookmarks found for userId ${userId}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  
    return items;
  }

  update(id: number, updateBookmarkDto: UpdateBookmarkDto) {
    return this.prisma.bookmark.update({
      where: { id },
      data: updateBookmarkDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.bookmark.delete({
      where: { id },
    });
  }


}