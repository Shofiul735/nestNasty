import { DataSource, Repository } from "typeorm";
import { Task } from "../dbModels/task.entity";
import { Injectable, Scope } from "@nestjs/common";
import { CreateTaskDto } from "../dtos/task.dto";
import { TaskStatus } from "../task.model";

@Injectable({scope: Scope.REQUEST})
export class TaskRepository extends Repository<Task>{
    
    constructor(private readonly dataSource:DataSource){
        super(Task,dataSource.createEntityManager());
    }

    async createTask(createTaskDto:CreateTaskDto): Promise<Task>{
        const {title, description} = createTaskDto;

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN
        });
        await this.save(task);
        return task;
    }
}