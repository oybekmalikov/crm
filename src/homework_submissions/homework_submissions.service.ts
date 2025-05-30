import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateHomeworkSubmissionDto } from "./dto/create-homework_submission.dto";
import { UpdateHomeworkSubmissionDto } from "./dto/update-homework_submission.dto";
import { HomeworkSubmission } from "./entities/homework_submission.entity";

@Injectable()
export class HomeworkSubmissionsService {
	constructor(
		@InjectRepository(HomeworkSubmission)
		private readonly homeworkSubmissionRepo: Repository<HomeworkSubmission>
	) {}
	async create(createHomeworkSubmissionDto: CreateHomeworkSubmissionDto) {
		return this.homeworkSubmissionRepo.save({
			...createHomeworkSubmissionDto,
		});
	}

	findAll() {
		return this.homeworkSubmissionRepo.find();
	}

	findOne(id: number) {
		return this.homeworkSubmissionRepo.findOne({ where: { id } });
	}
	update(id: number, updateHomeworkSubmissionDto: UpdateHomeworkSubmissionDto) {
		return this.homeworkSubmissionRepo.update(id, updateHomeworkSubmissionDto);
	}

	remove(id: number) {
		return this.homeworkSubmissionRepo.delete(id);
	}
}
