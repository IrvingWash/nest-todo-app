import { Injectable } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from "./dto/create-task-dto";

import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
	private tasks: Task[] = [];

	public getAllTasks(): Task[] {
		return this.tasks;
	}

	public getTaskById(id: string): Task {
		return this.tasks.find((task) => task.id === id);
	}

	public createTask(createTaskDto: CreateTaskDto): Task {
		const { title, description } = createTaskDto;

		const task: Task = {
			id: uuid(),
			title,
			description,
			status: TaskStatus.OPEN,
		};

		this.tasks.push(task);

		return task;
	}

	public updateTaskStatus(id: string, status: TaskStatus): Task {
		const task = this.getTaskById(id);

		task.status = status;

		return task;
	}

	public deleteTask(id: string): void {
		this.tasks = this.tasks.filter((task) => task.id !== id);
	}
}
