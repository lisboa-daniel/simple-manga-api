import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateReadDto } from './dto/create-read.dto';
import { UpdateReadDto } from './dto/update-read.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReadService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReadDto: CreateReadDto) {
    try {
      const read = await this.prisma.read.create({
        data: createReadDto,
      });

      return read;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Unique constraint violation (userId + titleId)
        if (error.code === 'P2002') {
          throw new BadRequestException('This user already has a read entry for this manga');
        }
      }

      throw new InternalServerErrorException('Failed to create read entry');
    }
  }

  async findAll() {
    return this.prisma.read.findMany({
      include: {
        user: false,
        manga: false,
      },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.read.findUnique({
      where: { id },
      include: {
        user: false,
        manga: false,
      },
    });

    if (!item) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Read entry with Id ${id} does not exist`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return item;
  }

  async update(id: number, updateReadDto: UpdateReadDto) {
    try {
      return await this.prisma.read.update({
        where: { id },
        data: updateReadDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Read entry with Id ${id} not found`);
      }
      throw new InternalServerErrorException('Failed to update read entry');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.read.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Read entry with Id ${id} not found`);
      }
      throw new InternalServerErrorException('Failed to delete read entry');
    }
  }
}
