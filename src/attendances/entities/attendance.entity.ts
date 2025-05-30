import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attendance {
	@PrimaryGeneratedColumn()
	declare id: number;

	@Column()
	declare student_id: string;

	@Column()
	declare schedule_id: string;

	@Column()
	declare date: Date;

	@Column()
	declare status: boolean;

}
