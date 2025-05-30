import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Grade {
	@PrimaryGeneratedColumn()
	declare id: number;

	@Column()
	declare student_id: number;

	@Column()
	declare homework_submission_id: number;

	@Column()
	declare teacher_id: number;

	@Column()
	declare grade: number;

	@Column()
	declare date: Date;

	@Column()
	declare comment: string;
}
