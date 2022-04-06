import { EntityRepository, Repository } from 'typeorm';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatus } from './task-status-enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
	public async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
		const { status, search } = filterDto;

		const query = this.createQueryBuilder('task');

		if (status !== undefined) {
			query.andWhere('task.status = :status', { status });
		}

		if (search !== undefined) {
			query.andWhere(
				'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
				{ search: `%${search}%` }
			);
		}

		const tasks = await query.getMany();

		return tasks;
	}

	public async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
		const { title, description } = createTaskDto;

		const newTask = this.create({
			title,
			description,
			status: TaskStatus.OPEN,
			user,
		});

		await this.save(newTask);

		return newTask;
	}
}
