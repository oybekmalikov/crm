import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Media {
	@PrimaryGeneratedColumn()
	declare id: number;

	@Column()
	declare table_id: number;

	@Column()
	declare table_name: string;

	@Column()
	declare files: string;

	@Column()
	declare type: string;

	@Column()
	declare file_name: string;

	@Column()
	declare size: number;
}
