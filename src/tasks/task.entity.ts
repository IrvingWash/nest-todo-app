import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { TaskStatus } from './task-status-enum';
import { User } from 'src/auth/user.entity';

@Entity()
export class Task {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column()
	public title: string;

	@Column()
	public description: string;

	@Column()
	public status: TaskStatus;

	@ManyToOne(
		_type => User,
		user => user.tasks,
		{ eager: false }
	)
	public user: User;
}
