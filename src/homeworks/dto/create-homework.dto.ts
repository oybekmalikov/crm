export class CreateHomeworkDto {
	subject_id: number;

	teacher_id: number;

	group_id: number;

	description: string;

	deadline: Date;

	file_url: string;
}
