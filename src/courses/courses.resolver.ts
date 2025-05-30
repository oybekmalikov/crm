import { Controller } from "@nestjs/common";
import { Args, ID, Mutation, Query } from "@nestjs/graphql";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Course } from "./entities/course.entity";

@Controller("courses")
export class CoursesController {
	constructor(private readonly coursesService: CoursesService) {}

	@Mutation(() => Course)
	createCourse(@Args("createCourse") createCourseDto: CreateCourseDto) {
		return this.coursesService.create(createCourseDto);
	}

	@Query(() => [Course])
	findAllCourse() {
		return this.coursesService.findAll();
	}

	@Query(() => Course)
	findOneCourse(@Args("id", { type: () => ID }) id: number) {
		return this.coursesService.findOne(+id);
	}

	@Mutation(() => Course)
	updateCourse(
		@Args("id", { type: () => ID }) id: number,
		@Args("updateCourse") updateCourseDto: UpdateCourseDto
	) {
		return this.coursesService.update(+id, updateCourseDto);
	}

	@Mutation(() => Number)
	removeCourse(@Args("id", { type: () => ID }) id: number) {
		return this.coursesService.remove(+id);
	}
}
