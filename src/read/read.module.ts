import { Module } from '@nestjs/common';
import { ReadService } from './read.service';
import { ReadController } from './read.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReadController],
  providers: [ReadService],
})
export class ReadModule {}
