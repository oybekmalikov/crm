import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentGroup } from "./entities/student_group.entity";
import { StudentGroupsController } from "./student_groups.controller";
import { StudentGroupsService } from "./student_groups.service";

@Module({
	imports: [TypeOrmModule.forFeature([StudentGroup])],
	controllers: [StudentGroupsController],
	providers: [StudentGroupsService],
})
export class StudentGroupsModule {}
