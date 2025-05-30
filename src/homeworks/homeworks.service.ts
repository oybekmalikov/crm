import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateHomeworkDto } from "./dto/create-homework.dto";
import { UpdateHomeworkDto } from "./dto/update-homework.dto";
import { Homework } from "./entities/homework.entity";

@Injectable()
export class HomeworksService {
	constructor(
		@InjectRepository(Homework)
		private readonly homeworkRepo: Repository<Homework>
	) {}
	async create(createHomeworkDto: CreateHomeworkDto) {
		return this.homeworkRepo.save({
			...createHomeworkDto,
		});
	}

	findAll() {
		return this.homeworkRepo.find();
	}

	findOne(id: number) {
		return this.homeworkRepo.findOne({ where: { id } });
	}
	update(id: number, updateHomeworkDto: UpdateHomeworkDto) {
		return this.homeworkRepo.update(id, updateHomeworkDto);
	}

	remove(id: number) {
		return this.homeworkRepo.delete(id);
	}
}
