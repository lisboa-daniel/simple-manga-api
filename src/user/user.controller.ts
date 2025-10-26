import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ✅ CREATE USER
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (err) {
      throw err;
    }
  }

  // ✅ GET ALL USERS
  @Get()
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (err) {
      throw err;
    }
  }

  // ✅ GET ONE USER (UUID)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.userService.findOne(id);
    } catch (err) {
      throw err;
    }
  }

  // ✅ UPDATE USER
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.userService.update(id, updateUserDto);
    } catch (err) {
      throw err;
    }
  }

  // ✅ DELETE USER
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.userService.remove(id);
    } catch (err) {
      throw err;
    }
  }
}
