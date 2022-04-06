import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
	constructor (
		@InjectRepository(UsersRepository)
		private usersRepository: UsersRepository
	) {}

	public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		return this.usersRepository.createUser(authCredentialsDto);
	}

	public async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
		const { username, password } = authCredentialsDto;

		console.log(username, password);

		const user = await this.usersRepository.findOne({ username });

		if (user !== undefined && await bcrypt.compare(password, user.password)) {
			return 'success';
		}

		throw new UnauthorizedException('Please check your credentials');
	}
}
