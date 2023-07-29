import { Injectable,NotFoundException,Scope } from '@nestjs/common';
import {  TaskStatus } from './task.model';
import { CreateTaskDto } from './dtos/task.dto';
import { TaskRepository } from './repositories/task.repository';
import { Task } from './dbModels/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { title } from 'process';


@Injectable({'scope':Scope.TRANSIENT}) // Singleton, Scope.REQUEST => CREATED in starting of each http request and shared acrossed the app, Scope.TRANSIENT => every controller has an new instance; 
export class TasksService {
    constructor(private readonly taskRepository:TaskRepository){

    }
    // private tasks: Task[] = [];
    // private id:number = 0;

    // getAllTasks(): Task[]{
    //     return this.tasks;
    // }

    // createTask(createTaskDto: CreateTaskDto): Task{
    //     this.id++;

    //     const {title, description} = createTaskDto;

    //     const task: Task = {
    //         id: this.id.toString(),
    //         title: title,
    //         description: description,
    //         status: TaskStatus.OPEN
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }

    // getById(id: string): Task{
    //     return this.tasks.find((i) => i.id === id);
    // }

    async getTaskBtId(id: string): Promise<Task>{
        const found = await this.taskRepository.findOne({
            where:{
                id: id,
            }
        });
        
        if(!found){
            throw new NotFoundException(`Data not found for the id: ${id}`);
        }
        return found;
    }

    // deleteById(id: string): Task{
    //     const task =  this.getById(id);
    //     this.tasks =  this.tasks.filter(i => i.id !== id);
    //     return task;
    // }

    // updateStatusById(id: string, taskStatus:TaskStatus): Task{
    //     const task = this.getById(id);
    //     task.status = taskStatus;
    //     return task;
    // }
}
