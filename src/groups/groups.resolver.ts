import { Controller } from "@nestjs/common";
import { Args, ID, Mutation, Query } from "@nestjs/graphql";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { Group } from "./entities/group.entity";
import { GroupsService } from "./groups.service";

@Controller("groups")
export class GroupsController {
	constructor(private readonly groupsService: GroupsService) {}

	@Mutation(() => Group)
	createGroup(@Args("createGroup") createGroupDto: CreateGroupDto) {
		return this.groupsService.create(createGroupDto);
	}

	@Query(() => [Group])
	findAllGroup() {
		return this.groupsService.findAll();
	}

	@Query(() => Group)
	findOneGroup(@Args("id", { type: () => ID }) id: number) {
		return this.groupsService.findOne(+id);
	}

	@Mutation(() => Group)
	updateGroup(
		@Args("id", { type: () => ID }) id: number,
		@Args("updateGroup") updateGroupDto: UpdateGroupDto
	) {
		return this.groupsService.update(+id, updateGroupDto);
	}

	@Mutation(() => Number)
	removeGroup(@Args("id", { type: () => ID }) id: number) {
		return this.groupsService.remove(+id);
	}
}
