import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { Group } from "./entities/group.entity";

@Injectable()
export class GroupsService {
	constructor(
		@InjectRepository(Group) private readonly groupRepo: Repository<Group>
	) {}
	async create(createGroupDto: CreateGroupDto) {
		return this.groupRepo.save({
			...createGroupDto,
		});
	}

	findAll() {
		return this.groupRepo.find();
	}

	findOne(id: number) {
		return this.groupRepo.findOne({ where: { id } });
	}
	update(id: number, updateGroupDto: UpdateGroupDto) {
		return this.groupRepo.update(id, updateGroupDto);
	}

	remove(id: number) {
		return this.groupRepo.delete(id);
	}
}
