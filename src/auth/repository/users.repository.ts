import { DataSource, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Injectable, Scope } from "@nestjs/common";
import { UserCredentialsDto } from "../dtos/user-credentials.dto";

@Injectable({scope:Scope.REQUEST})
export class UserRepository extends Repository<User>{
    constructor(private readonly dataSource:DataSource){
        super(User,dataSource.createEntityManager());
    }

    async createUser(userCredentialsDto: UserCredentialsDto):Promise<User>{
        const {userName,password} = userCredentialsDto;
        const user = {userName,password};
        const savedUser = await this.save(user);
        return savedUser;
    }
}