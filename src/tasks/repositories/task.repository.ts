import { DataSource, EntityRepository, Repository } from "typeorm";
import { Task } from "../dbModels/task.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskRepository extends Repository<Task>{
    constructor(private readonly dataSource:DataSource){
        super(Task,dataSource.createEntityManager());
    }
}