import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Task } from 'src/tasks/task.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({
		unique: true,
	})
	public username: string;

	@Column()
	public password: string;

	@OneToMany(
		(type) => Task,
		task => task.user,
		{ eager: true }
	)
	public tasks: Task[];
}
