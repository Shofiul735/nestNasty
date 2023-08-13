import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './repository/users.repository';
import { UserCredentialsDto } from './dtos/user-credentials.dto';
import * as bcrypt from 'bcrypt';


@Injectable({scope:Scope.TRANSIENT})
export class AuthService {
    constructor(private readonly usersRepository: UserRepository){

    }

    async createUser(userCredentialsDto:UserCredentialsDto):Promise<boolean>{
       const newUser = await this.usersRepository.createUser(userCredentialsDto);
       return newUser.id.length > 0;
    }

    async signinUser(userCredentialsDto: UserCredentialsDto):Promise<string>{
        const {userName, password} = userCredentialsDto;
        const user = this.usersRepository.findOneBy({userName});
        if(user && await bcrypt.compare(password,(await user).password)){
            return 'success'
        }else{
            throw new UnauthorizedException('Please check your login credentials');
        }
    }
}
