import { DataSource, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Injectable, Scope } from "@nestjs/common";

@Injectable({scope:Scope.REQUEST})
export class UserRepository extends Repository<User>{
    constructor(private readonly dataSource:DataSource){
        super(User,dataSource.createEntityManager());
    }
}