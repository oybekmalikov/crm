import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateStudentGroupDto } from "./dto/create-student_group.dto";
import { UpdateStudentGroupDto } from "./dto/update-student_group.dto";
import { StudentGroup } from "./entities/student_group.entity";

@Injectable()
export class StudentGroupsService {
	constructor(
		@InjectRepository(StudentGroup)
		private readonly studentGroupRepo: Repository<StudentGroup>
	) {}
	async create(createStudentGroupDto: CreateStudentGroupDto) {
		return this.studentGroupRepo.save({
			...createStudentGroupDto,
		});
	}

	findAll() {
		return this.studentGroupRepo.find();
	}

	findOne(id: number) {
		return this.studentGroupRepo.findOne({ where: { id } });
	}
	update(id: number, updateStudentGroupDto: UpdateStudentGroupDto) {
		return this.studentGroupRepo.update(id, updateStudentGroupDto);
	}

	remove(id: number) {
		return this.studentGroupRepo.delete(id);
	}
}
