import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status-enum';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
	public constructor(
		@InjectRepository(TasksRepository)
		private tasksRepository: TasksRepository
	) {}

	public getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
		return this.tasksRepository.getTasks(filterDto, user);
	}

	public async getTaskById(id: string, user: User): Promise<Task> {
		const foundTask = await this.tasksRepository.findOne({
			where: {
				id,
				user,
			},
		});

		if (foundTask === undefined) {
			throw new NotFoundException(`Task with ${id} ID not found`);
		}

		return foundTask;
	}

	public createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
		return this.tasksRepository.createTask(createTaskDto, user);
	}
	
	public async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
		const task = await this.getTaskById(id, user);

		task.status = status;

		await this.tasksRepository.save(task);

		return task;
	}

	public async deleteTask(id: string): Promise<void> {
		const deleteResult = await this.tasksRepository.delete(id);

		if (deleteResult.affected === 0) {
			throw new NotFoundException(`Task with ${id} id not found`);
		}
	}
}
