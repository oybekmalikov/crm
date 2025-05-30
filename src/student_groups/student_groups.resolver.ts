import { Controller } from "@nestjs/common";
import { Args, ID, Mutation, Query } from "@nestjs/graphql";
import { CreateStudentGroupDto } from "./dto/create-student_group.dto";
import { UpdateStudentGroupDto } from "./dto/update-student_group.dto";
import { StudentGroup } from "./entities/student_group.entity";
import { StudentGroupsService } from "./student_groups.service";

@Controller("student-groups")
export class StudentGroupsController {
	constructor(private readonly studentGroupsService: StudentGroupsService) {}

	@Mutation(() => StudentGroup)
	createStudentGroup(
		@Args("createStudentGroup") createStudentGroupDto: CreateStudentGroupDto
	) {
		return this.studentGroupsService.create(createStudentGroupDto);
	}

	@Query(() => [StudentGroup])
	findAllStudentGroup() {
		return this.studentGroupsService.findAll();
	}

	@Query(() => StudentGroup)
	findOneStudentGroup(@Args("id", { type: () => ID }) id: number) {
		return this.studentGroupsService.findOne(+id);
	}

	@Mutation(() => StudentGroup)
	updateStudentGroup(
		@Args("id", { type: () => ID }) id: number,
		@Args("updateStudentGroup") updateStudentGroupDto: UpdateStudentGroupDto
	) {
		return this.studentGroupsService.update(+id, updateStudentGroupDto);
	}

	@Mutation(() => Number)
	removeStudentGroup(@Args("id", { type: () => ID }) id: number) {
		return this.studentGroupsService.remove(+id);
	}
}
