import { Module } from '@nestjs/common';
import { AuthTeachersService } from './auth_teachers.service';
import { AuthTeachersController } from './auth_teachers.controller';

@Module({
  controllers: [AuthTeachersController],
  providers: [AuthTeachersService],
})
export class AuthTeachersModule {}
