import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { Teacher } from "./entities/teacher.entity";
@Injectable()
export class TeachersService {
	constructor(
		@InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>
	) {}
	async create(createTeacherDto: CreateTeacherDto) {
		const condidate = await this.findByEmail(createTeacherDto.email);
		if (condidate) {
			throw new ConflictException(`${createTeacherDto.email} already exists`);
		}
		const hashshedPassword = await bcrypt.hash(createTeacherDto.password, 7);
		const newTeacher = this.teacherRepo.save({
			...createTeacherDto,
			password: hashshedPassword,
		});
		return newTeacher;
	}

	findAll() {
		return this.teacherRepo.find();
	}

	findOne(id: number) {
		return this.teacherRepo.findOne({ where: { id } });
	}
	findByEmail(email: string) {
		return this.teacherRepo.findOne({ where: { email } });
	}

	update(id: number, updateTeacherDto: UpdateTeacherDto) {
		return this.teacherRepo.update(id, updateTeacherDto);
	}

	remove(id: number) {
		return this.teacherRepo.delete(id);
	}
	async updateRefreshToken(teacherId: number, refreshToken: string) {
		const updatedAdmin = this.teacherRepo.update(teacherId, {
			refresh_token: refreshToken,
		});
		return updatedAdmin;
	}
}
