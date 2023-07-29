import { DataSource, EntityRepository, Repository } from "typeorm";
import { Task } from "../dbModels/task.entity";
import { Injectable, Scope } from "@nestjs/common";

@Injectable({scope: Scope.REQUEST})
export class TaskRepository extends Repository<Task>{
    constructor(private readonly dataSource:DataSource){
        super(Task,dataSource.createEntityManager());
    }
}