import { Controller, Post, HttpException, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

import { LoginResult } from './interfaces/login-result.interface';
import { User } from './interfaces/user.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async loginUser(@Body() body: LoginUserDto): Promise<LoginResult> {
        try {
            return await this.authService.loginUser(body);
        } catch (error) {
            this.error(error);
        }
    }

    @Post('register')
    async registerUser(@Body() body: RegisterUserDto): Promise<User> {
        try {
            return await this.authService.registerUser(body);
        } catch (error) {
            this.error(error);
        }
    }

    // Show error
    error(message: string, code?: number): HttpException {
        throw new HttpException(message, code || 403);
    }
}
