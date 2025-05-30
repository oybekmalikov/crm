import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTeacherGroupDto } from "./dto/create-teacher_group.dto";
import { UpdateTeacherGroupDto } from "./dto/update-teacher_group.dto";
import { TeacherGroup } from "./entities/teacher_group.entity";

@Injectable()
export class TeacherGroupsService {
	constructor(
		@InjectRepository(TeacherGroup)
		private readonly teacherGroupRepo: Repository<TeacherGroup>
	) {}
	async create(createTeacherGroupDto: CreateTeacherGroupDto) {
		return this.teacherGroupRepo.save({
			...createTeacherGroupDto,
		});
	}

	findAll() {
		return this.teacherGroupRepo.find();
	}

	findOne(id: number) {
		return this.teacherGroupRepo.findOne({ where: { id } });
	}
	update(id: number, updateTeacherGroupDto: UpdateTeacherGroupDto) {
		return this.teacherGroupRepo.update(id, updateTeacherGroupDto);
	}

	remove(id: number) {
		return this.teacherGroupRepo.delete(id);
	}
}
