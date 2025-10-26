import { Injectable } from '@nestjs/common';
import { CreateReadDto } from './dto/create-read.dto';
import { UpdateReadDto } from './dto/update-read.dto';

@Injectable()
export class ReadService {
  create(createReadDto: CreateReadDto) {
    return 'This action adds a new read';
  }

  findAll() {
    return `This action returns all read`;
  }

  findOne(id: number) {
    return `This action returns a #${id} read`;
  }

  update(id: number, updateReadDto: UpdateReadDto) {
    return `This action updates a #${id} read`;
  }

  remove(id: number) {
    return `This action removes a #${id} read`;
  }
}
