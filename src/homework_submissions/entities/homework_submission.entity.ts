import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class HomeworkSubmission {
	@PrimaryGeneratedColumn()
	declare id: number;

	@Column()
	declare homework_id: number;

	@Column()
	declare student_id: number;

	@Column()
	declare file_url: string;

	@Column()
	declare submitted_at: Date;

	@Column()
	declare comment: string;

	@Column()
	declare status: boolean;
}
