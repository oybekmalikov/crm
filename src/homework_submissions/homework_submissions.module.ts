import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HomeworkSubmission } from "./entities/homework_submission.entity";
import { HomeworkSubmissionsController } from "./homework_submissions.controller";
import { HomeworkSubmissionsService } from "./homework_submissions.service";

@Module({
	imports: [TypeOrmModule.forFeature([HomeworkSubmission])],
	controllers: [HomeworkSubmissionsController],
	providers: [HomeworkSubmissionsService],
})
export class HomeworkSubmissionsModule {}
