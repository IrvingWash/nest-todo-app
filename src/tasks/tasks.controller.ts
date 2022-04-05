import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";

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

	@Get('/:id')
	public getTaskById(@Param('id') id: string): Task {
		return this.tasksService.getTaskById(id);
	}

	@Post()
	public createTask(@Body() createTaskDto: CreateTaskDto): Task {
		return this.tasksService.createTask(createTaskDto);
	}

	@Delete('/:id')
	public deleteTask(@Param('id') id: string): void {
		return this.tasksService.deleteTask(id);
	}
}
