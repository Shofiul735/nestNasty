import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/task.dto';
import { Task } from './entities/task.entity';
import { Public } from 'src/auth/public.decorator';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService:TasksService){}

    @Get()
    @Public()
    getAllTasks(): Promise<Task[]> {
        return this.tasksService.getAllTasks();
    }

    // @Post()
    // createTask(@Body() createTaskDto: CreateTaskDto):Task {
    //     return this.tasksService.createTask(createTaskDto);
    // }

    @Get('/:id')
    findById(@Param('id') id:string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto:CreateTaskDto): Promise<Task>{
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteById(@Param('id') id:string): Promise<void>{
        return this.tasksService.deleteById(id);
    }

    @Patch()
    updateById(@Query('id') id:string, @Body('status') status:TaskStatus): Promise<Task>{
        return this.tasksService.updateStatusById(id,status);
    }
}
