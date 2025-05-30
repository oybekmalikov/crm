import { Column, PrimaryGeneratedColumn } from "typeorm";

export class TeacherGroup {
	@PrimaryGeneratedColumn()
	declare id: number;

	@Column()
	declare teacher_id: number;

	@Column()
	declare group_id: number;
}
