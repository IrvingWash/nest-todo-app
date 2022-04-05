import { Body, Controller, Get, Post } from "@nestjs/common";

import { TasksService } from "./tasks.service";
import { Task } from "./task.model";
import { CreateTaskDto } from "./dto/create-task-dto";

@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService) {}

	@Get()
	public getAllTasks(): Task[] {
		return this.tasksService.getAllTasks();
	}

	@Post()
	public createTask(@Body() createTaskDto: CreateTaskDto): Task {
		return this.tasksService.createTask(createTaskDto);
	}
}
