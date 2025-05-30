import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { Grade } from "./entities/grade.entity";

@Injectable()
export class GradesService {
	constructor(
		@InjectRepository(Grade) private readonly gradeRepo: Repository<Grade>
	) {}
	async create(createGradeDto: CreateGradeDto) {
		return this.gradeRepo.save({
			...createGradeDto,
		});
	}

	findAll() {
		return this.gradeRepo.find();
	}

	findOne(id: number) {
		return this.gradeRepo.findOne({ where: { id } });
	}
	update(id: number, updateGradeDto: UpdateGradeDto) {
		return this.gradeRepo.update(id, updateGradeDto);
	}

	remove(id: number) {
		return this.gradeRepo.delete(id);
	}
}
