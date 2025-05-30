export class CreateHomeworkSubmissionDto {
	homework_id: number;

	student_id: number;

	file_url: string;

	submitted_at: Date;

	comment: string;

	status: boolean;
}
