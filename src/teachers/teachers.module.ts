import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Teacher } from './entities/teacher.entity'

@Module({
  imports:[TypeOrmModule.forFeature([Teacher])],
  controllers: [TeachersController],
  providers: [TeachersService],
  exports:[TeachersService]
})
export class TeachersModule {}
