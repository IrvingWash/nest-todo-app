import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
	@IsString()
	@MinLength(4)
	@MaxLength(20)
	public username: string;

	@IsString()
	@MinLength(8)
	@MaxLength(32)
	public password: string;
}
