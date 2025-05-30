import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { Media } from "./entities/media.entity";

@Injectable()
export class MediaService {
	constructor(
		@InjectRepository(Media) private readonly mediaRepo: Repository<Media>
	) {}
	async create(createMediaDto: CreateMediaDto) {
		return this.mediaRepo.save({
			...createMediaDto,
		});
	}

	findAll() {
		return this.mediaRepo.find();
	}

	findOne(id: number) {
		return this.mediaRepo.findOne({ where: { id } });
	}
	update(id: number, updateMediaDto: UpdateMediaDto) {
		return this.mediaRepo.update(id, updateMediaDto);
	}

	remove(id: number) {
		return this.mediaRepo.delete(id);
	}
}
