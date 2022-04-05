import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
	@IsOptional()
	@IsEnum(TaskStatus)
	public status?: TaskStatus;

	@IsOptional()
	@IsString()
	public search?: string;
}
