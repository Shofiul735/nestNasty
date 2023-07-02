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

    getById(id: string): Task{
        return this.tasks.find((i) => i.id === id);
    }

    deleteById(id: string): Task{
        const task =  this.getById(id);
        this.tasks =  this.tasks.filter(i => i.id !== id);
        return task;
    }

    updateStatusById(id: string, taskStatus:TaskStatus): Task{
        const task = this.getById(id);
        task.status = taskStatus;
        return task;
    }
}
