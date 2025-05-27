import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Teacher {
	@PrimaryGeneratedColumn()
	declare id: number;

	@Column()
	declare first_name: string;

	@Column()
	declare last_name: string;

	@Column()
	declare email: string;

	@Column()
	declare password: string;

	@Column()
	declare phone: string;

	@Column()
	declare role: string;

	@Column()
	declare is_active: boolean;

	@Column()
	declare refresh_token: string;
}
