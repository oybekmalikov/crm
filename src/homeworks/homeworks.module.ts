import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Homework } from "./entities/homework.entity";
import { HomeworksController } from "./homeworks.controller";
import { HomeworksService } from "./homeworks.service";

@Module({
	imports: [TypeOrmModule.forFeature([Homework])],
	controllers: [HomeworksController],
	providers: [HomeworksService],
})
export class HomeworksModule {}
