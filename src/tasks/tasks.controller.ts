import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
	public constructor(private tasksService: TasksService) {}

	@Get()
	public async getTasks(
		@Query() filterDto: GetTasksFilterDto,
		@GetUser() user: User,
	): Promise<Task[]> {
		return this.tasksService.getTasks(filterDto, user);
	}

	@Get('/:id')
	public getTaskById(
		@Param('id') id: string,
		@GetUser() user: User,
	): Promise<Task> {
		return this.tasksService.getTaskById(id, user);
	}

	@Post()
	public createTask(
		@Body() createTaskDto: CreateTaskDto,
		@GetUser() user: User,
	): Promise<Task> {
		return this.tasksService.createTask(createTaskDto, user);
	}

	@Patch('/:id/status')
	public async updateTaskStatus(
		@Param('id') id: string,
		@Body() updateTaskStatusDto: UpdateTaskStatusDto,
		@GetUser() user: User
	): Promise<Task> {
		const { status } = updateTaskStatusDto;
	
		return this.tasksService.updateTaskStatus(id, status, user);
	}

	@Delete('/:id')
	public deleteTask(@Param('id') id: string): Promise<void> {
		return this.tasksService.deleteTask(id);
	}
}
