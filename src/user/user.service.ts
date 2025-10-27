import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ CREATE USER
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: createUserDto,
      });
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle unique constraint violation (e.g., duplicate email or name)
        if (error.code === 'P2002') {
          const target = (error.meta?.target as string[])?.join(', ') || 'field';
          throw new BadRequestException(`User with the same ${target} already exists`);
        }
      }

      throw new InternalServerErrorException('Failed to create user');
    }
  }

  // ✅ FIND ALL USERS
  async findAll() {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }

  // ✅ FIND ONE USER BY ID
  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `User with ID ${id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Invalid user ID format');
      }
      throw new InternalServerErrorException('Failed to find user');
    }
  }


  async login(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `User with email ${email} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Invalid user ID format');
      }
      throw new InternalServerErrorException('Failed to find user');
    }
  }

  // ✅ UPDATE USER
  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      return updatedUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        if (error.code === 'P2002') {
          const target = (error.meta?.target as string[])?.join(', ') || 'field';
          throw new BadRequestException(`User with the same ${target} already exists`);
        }
      }

      throw new InternalServerErrorException('Failed to update user');
    }
  }

  // ✅ DELETE USER
  async remove(id: string) {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: { id },
      });
      return deletedUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
      }
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
