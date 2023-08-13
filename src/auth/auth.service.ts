import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './repository/users.repository';
import { UserCredentialsDto } from './dtos/user-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dtos/jwt.payload.interface';


@Injectable({scope:Scope.TRANSIENT})
export class AuthService {
    constructor(
        private readonly usersRepository: UserRepository,
        private readonly jwtService: JwtService
        ){

    }

    async createUser(userCredentialsDto:UserCredentialsDto):Promise<boolean>{
       const newUser = await this.usersRepository.createUser(userCredentialsDto);
       return newUser.id.length > 0;
    }

    async signinUser(userCredentialsDto: UserCredentialsDto):Promise<Object>{
        const {userName, password} = userCredentialsDto;
        const user = await this.usersRepository.findOneBy({userName});
        if(user && await bcrypt.compare(password,user.password)){
            const payload : JwtPayload = { userName };
            const accessToken : string = await this.jwtService.signAsync(payload);
            return { accessToken };
        }else{
            throw new UnauthorizedException('Please check your login credentials');
        }
    }
}
