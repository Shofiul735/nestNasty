import { BadRequestException, Injectable,NotFoundException,Scope } from '@nestjs/common';
import {  TaskStatus } from './task.model';
import { CreateTaskDto } from './dtos/task.dto';
import { TaskRepository } from './repositories/task.repository';
import { Task } from './entities/task.entity';
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

    async getAllTasks():Promise<Task[]>{
        return await this.taskRepository.find();
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        try{
            return await this.taskRepository.createTask(createTaskDto);
        }catch(ex){
            throw new BadRequestException(`Task can't be created`);
        }
        
    }

    // getById(id: string): Task{
    //     return this.tasks.find((i) => i.id === id);
    // }

    async getTaskById(id: string): Promise<Task>{
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

    async deleteById(id: string): Promise<void>{
        // using entity
        // try{
        //     const task = await this.getTaskBtId(id);
        //     await this.taskRepository.remove(task);
        //     return task;
        // }catch(ex){
        //     throw ex;
        // }
        
        // using id
        const result = await this.taskRepository.delete(id);
        if(result.affected === 0){
            throw new NotFoundException(`Task is not found for the id: ${id}`); 
        }
    }

    async updateStatusById(id: string, taskStatus:TaskStatus): Promise<Task>{
        try{
            const task = await this.getTaskById(id);
            task.status = taskStatus;
            return await this.taskRepository.save(task);
        }catch(ex){
            throw ex;
        }
    }
}
