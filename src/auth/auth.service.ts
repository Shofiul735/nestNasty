import { Injectable, Scope } from '@nestjs/common';
import { UserRepository } from './repository/users.repository';
import { UserCredentialsDto } from './dtos/user-credentials.dto';

@Injectable({scope:Scope.TRANSIENT})
export class AuthService {
    constructor(private readonly usersRepository: UserRepository){

    }

    async createUser(userCredentialsDto:UserCredentialsDto):Promise<boolean>{
       const newUser = await this.usersRepository.createUser(userCredentialsDto);
       return newUser.id.length > 0;
    }
}
