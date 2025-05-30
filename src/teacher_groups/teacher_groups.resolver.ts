import { Controller } from "@nestjs/common";
import { Args, ID, Mutation, Query } from "@nestjs/graphql";
import { CreateTeacherGroupDto } from "./dto/create-teacher_group.dto";
import { UpdateTeacherGroupDto } from "./dto/update-teacher_group.dto";
import { TeacherGroup } from "./entities/teacher_group.entity";
import { TeacherGroupsService } from "./teacher_groups.service";

@Controller("teacher-groups")
export class TeacherGroupsController {
	constructor(private readonly teacherGroupsService: TeacherGroupsService) {}
	@Mutation(() => TeacherGroup)
	createTeacherGroup(
		@Args("createTeacherGroup") createTeacherGroupDto: CreateTeacherGroupDto
	) {
		return this.teacherGroupsService.create(createTeacherGroupDto);
	}

	@Query(() => [TeacherGroup])
	findAllTeacherGroup() {
		return this.teacherGroupsService.findAll();
	}

	@Query(() => TeacherGroup)
	findOneTeacherGroup(@Args("id", { type: () => ID }) id: number) {
		return this.teacherGroupsService.findOne(+id);
	}

	@Mutation(() => TeacherGroup)
	updateTeacherGroup(
		@Args("id", { type: () => ID }) id: number,
		@Args("updateTeacherGroup") updateTeacherGroupDto: UpdateTeacherGroupDto
	) {
		return this.teacherGroupsService.update(+id, updateTeacherGroupDto);
	}

	@Mutation(() => Number)
	removeTeacherGroup(@Args("id", { type: () => ID }) id: number) {
		return this.teacherGroupsService.remove(+id);
	}
}
