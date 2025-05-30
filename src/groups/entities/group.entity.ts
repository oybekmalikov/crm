import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group {
	@PrimaryGeneratedColumn()
	declare id: number;

	@Column()
	declare name: string;

	@Column()
	declare coures_id: number;

	@Column()
	declare start_date: Date;

	@Column()
	declare end_date: Date;

	@Column()
	declare status: boolean;

}
