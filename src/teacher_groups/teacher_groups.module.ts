import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeacherGroup } from "./entities/teacher_group.entity";
import { TeacherGroupsController } from "./teacher_groups.controller";
import { TeacherGroupsService } from "./teacher_groups.service";

@Module({
	imports: [TypeOrmModule.forFeature([TeacherGroup])],
	controllers: [TeacherGroupsController],
	providers: [TeacherGroupsService],
})
export class TeacherGroupsModule {}
