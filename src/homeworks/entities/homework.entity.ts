import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Homework {
	@PrimaryGeneratedColumn()
	declare id: number;

	@Column()
	declare subject_id: number;

	@Column()
	declare teacher_id: number;

	@Column()
	declare group_id: number;

	@Column()
	declare description: string;

	@Column()
	declare deadline: Date;

	@Column()
	declare file_url: string;
}
