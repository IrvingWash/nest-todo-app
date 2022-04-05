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
}
