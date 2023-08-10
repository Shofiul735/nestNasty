import { DataSource, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { BadRequestException, Injectable, Scope } from "@nestjs/common";
import { UserCredentialsDto } from "../dtos/user-credentials.dto";
import * as bcrypt from 'bcrypt';


@Injectable({scope:Scope.REQUEST})
export class UserRepository extends Repository<User>{
    constructor(private readonly dataSource:DataSource){
        super(User,dataSource.createEntityManager());
    }

    async createUser(userCredentialsDto: UserCredentialsDto):Promise<User>{
        const {userName,password} = userCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = {userName,password:hashedPassword};
        try{
            const savedUser = await this.save(user);
            return savedUser;
        }catch(ex){
            console.log(ex);
            throw new BadRequestException(ex.detail);
        }
    }
}