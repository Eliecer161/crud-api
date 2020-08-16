import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FirebaseAuthService } from 'src/firebase';
import { compare, hash } from 'bcryptjs';

//Interfaces
import { LoginResult } from './interfaces/login-result.interface';
import { User } from './interfaces/user.interface';

//Dto
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel('Users') private readonly usersModel: Model<User>,
        private readonly firebaseAuthService: FirebaseAuthService
    ) { }

    loginUser(body: LoginUserDto): Promise<LoginResult> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.validateUserByPassword(body.email, body.password);
                const token = await this.firebaseAuthService.generateToken(String(user._id), { email: user.email, name: user.name });
                resolve({ token });
            } catch (error) {
                reject(error);
            }
        });
    }

    // Register user
    registerUser(registerUserDto: RegisterUserDto): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                if (await this.usersModel.findOne({ email: registerUserDto.email })) {
                    reject('Ya existe un usuario con este correo');
                }
                const passwordHast = await hash(registerUserDto.password, 10);
                const user = new this.usersModel({
                    email: registerUserDto.email,
                    password: passwordHast,
                    name: registerUserDto.name
                });
                user.save();
                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    }

    // Get user by email
    getUserByEmail(email: string): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.usersModel.findOne({ 'email': email });
                if (user) {
                    resolve(user);
                }
                reject('El usuario no existe');
            } catch (error) {
                reject(error);
            }
        });
    }

    validateUserByPassword(email: string, password: string): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.getUserByEmail(email);
                if (await compare(password, user.password)) {
                    resolve(user);
                } else {
                    reject('Contraseña incorrecta');
                }
            } catch (error) {
                reject(error);
            }
        });
    }


}
