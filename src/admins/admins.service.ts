import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./entities/admin.entity";
@Injectable()
export class AdminsService {
	constructor(
		@InjectRepository(Admin) private readonly adminRepo: Repository<Admin>
	) {}
	async create(createAdminDto: CreateAdminDto) {
		const condidate = await this.findByEmail(createAdminDto.email);
		if (condidate) {
			throw new ConflictException(`${createAdminDto.email} already exists`);
		}
		const hashshedPassword = await bcrypt.hash(createAdminDto.password, 7);
		const newAdmin = this.adminRepo.save({
			...createAdminDto,
			password: hashshedPassword,
		});
		return newAdmin;
	}

	findAll() {
		return this.adminRepo.find();
	}

	findOne(id: number) {
		return this.adminRepo.findOne({ where: { id } });
	}
	findByEmail(email: string) {
		return this.adminRepo.findOne({ where: { email } });
	}

	update(id: number, updateAdminDto: UpdateAdminDto) {
		return this.adminRepo.update(id, updateAdminDto);
	}

	remove(id: number) {
		return this.adminRepo.delete(id);
	}
	async updateRefreshToken(adminId: number, refreshToken: string) {
		const updatedAdmin = this.adminRepo.update(adminId, {
			refresh_token: refreshToken,
		});
		return updatedAdmin;
	}
}
