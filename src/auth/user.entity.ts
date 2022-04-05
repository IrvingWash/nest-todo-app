import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column()
	public username: string;

	@Column()
	public password: string;
}