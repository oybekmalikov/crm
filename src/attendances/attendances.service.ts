import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAttendanceDto } from "./dto/create-attendance.dto";
import { UpdateAttendanceDto } from "./dto/update-attendance.dto";
import { Attendance } from "./entities/attendance.entity";

@Injectable()
export class AttendancesService {
	constructor(
		@InjectRepository(Attendance)
		private readonly attendancesRepo: Repository<Attendance>
	) {}
	async create(createAttendancesDto: CreateAttendanceDto) {
		return this.attendancesRepo.save({
			...createAttendancesDto,
		});
	}

	findAll() {
		return this.attendancesRepo.find();
	}

	findOne(id: number) {
		return this.attendancesRepo.findOne({ where: { id } });
	}
	update(id: number, updateAttendancesDto: UpdateAttendanceDto) {
		return this.attendancesRepo.update(id, updateAttendancesDto);
	}

	remove(id: number) {
		return this.attendancesRepo.delete(id);
	}
}
