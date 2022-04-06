import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
	constructor (
		@InjectRepository(UsersRepository)
		private usersRepository: UsersRepository,
		private jwtService: JwtService,
	) {}

	public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		return this.usersRepository.createUser(authCredentialsDto);
	}

	public async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
		const { username, password } = authCredentialsDto;

		const user = await this.usersRepository.findOne({ username });

		if (user !== undefined && await bcrypt.compare(password, user.password)) {
			const payload: JwtPayload = { username };

			const accessToken = this.jwtService.sign(payload);

			return { accessToken };
		}

		throw new UnauthorizedException('Please check your credentials');
	}
}
