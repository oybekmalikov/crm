import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Admin {
	@PrimaryGeneratedColumn()
	declare id: number;

	@Column()
	declare full_name: string;

	@Column()
	declare email: string;

	@Column()
	declare password: string;

	@Column()
	declare phone: string;

	@Column()
	declare is_active: boolean;

	@Column()
	declare is_creator: boolean;

	@Column()
	declare refresh_token: string;
}
