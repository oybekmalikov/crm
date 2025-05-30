import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Schedule {
	@PrimaryGeneratedColumn()
	declare id: number;

	@Column()
	declare group_id: number;

	@Column()
	declare day_of_week: string;

	@Column()
	declare start_time: string;

	@Column()
	declare end_time: string;

	@Column()
	declare room_id: number;
}
