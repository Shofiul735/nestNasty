import { Injectable,Scope } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dtos/task.dto';

@Injectable({'scope':Scope.TRANSIENT}) // Singleton, Scope.REQUEST => CREATED in starting of each http request and shared acrossed the app, Scope.TRANSIENT => every controller has an new instance; 
export class TasksService {
    private tasks: Task[] = [];
    private id:number = 0;

    getAllTasks(): Task[]{
        return this.tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task{
        this.id++;

        const {title, description} = createTaskDto;

        const task: Task = {
            id: this.id.toString(),
            title: title,
            description: description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }
}
