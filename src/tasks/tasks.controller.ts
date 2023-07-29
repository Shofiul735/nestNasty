import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/task.dto';
import { Task } from './dbModels/task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService:TasksService){}

    // @Get()
    // getAllTasks(): Task[] {
    //     return this.tasksService.getAllTasks();
    // }

    // @Post()
    // createTask(@Body() createTaskDto: CreateTaskDto):Task {
    //     return this.tasksService.createTask(createTaskDto);
    // }

    @Get('/:id')
    findById(@Param('id') id:string): Promise<Task> {
        return this.tasksService.getTaskBtId(id);
    }

    // @Delete('/:id')
    // deleteById(@Param('id') id:string): Task{
    //     return this.tasksService.deleteById(id);
    // }

    // @Patch('/:id/status')
    // updateById(@Param('id') id:string, @Body('status') status:TaskStatus): Task{
    //     return this.tasksService.updateStatusById(id,status);
    // }
}
