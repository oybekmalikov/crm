import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Student } from "./entities/student.entity";
@Injectable()
export class StudentsService {
	constructor(
		@InjectRepository(Student) private readonly studentRepo: Repository<Student>
	) {}
	async create(createStudentDto: CreateStudentDto) {
		const condidate = await this.findByEmail(createStudentDto.email);
		if (condidate) {
			throw new ConflictException(`${createStudentDto.email} already exists`);
		}
		const hashshedPassword = await bcrypt.hash(createStudentDto.password, 7);
		const newStudent = this.studentRepo.save({
			...createStudentDto,
			password: hashshedPassword,
		});
		return newStudent;
	}

	findAll() {
		return this.studentRepo.find();
	}

	findOne(id: number) {
		return this.studentRepo.findOne({ where: { id } });
	}
	findByEmail(email: string) {
		return this.studentRepo.findOne({ where: { email } });
	}

	update(id: number, updateStudentDto: UpdateStudentDto) {
		return this.studentRepo.update(id, updateStudentDto);
	}

	remove(id: number) {
		return this.studentRepo.delete(id);
	}
	async updateRefreshToken(studentId: number, refreshToken: string) {
		const updatedStudent = this.studentRepo.update(studentId, {
			refresh_token: refreshToken,
		});
		return updatedStudent;
	}
}
