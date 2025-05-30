import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Course {
	@PrimaryGeneratedColumn()
	declare id: number;

	@Column()
	declare title: string;

	@Column()
	declare description: string;

	@Column()
	declare price: number;

	@Column()
	declare duration: string;

	@Column()
	declare lessons_in_week: string;

	@Column()
	declare lessons_duration: string;
}
