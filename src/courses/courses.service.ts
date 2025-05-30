import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Course } from "./entities/course.entity";

@Injectable()
export class CoursesService {
	constructor(
		@InjectRepository(Course) private readonly courseRepo: Repository<Course>
	) {}
	async create(createCourseDto: CreateCourseDto) {
		return this.courseRepo.save({
			...createCourseDto,
		});
	}

	findAll() {
		return this.courseRepo.find();
	}

	findOne(id: number) {
		return this.courseRepo.findOne({ where: { id } });
	}
	update(id: number, updateCourseDto: UpdateCourseDto) {
		return this.courseRepo.update(id, updateCourseDto);
	}

	remove(id: number) {
		return this.courseRepo.delete(id);
	}
}
