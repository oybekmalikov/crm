import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StudentGroup {
	@PrimaryGeneratedColumn()
	declare id: number;

	@Column()
	declare student_id: number;

	@Column()
	declare group_id: number;

	@Column()
	declare period: string;

	@Column()
	declare is_active: boolean;
}
