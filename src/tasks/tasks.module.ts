import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './repositories/task.repository';
import { Task } from './dbModels/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task])
  ],
  controllers: [TasksController],
  providers: [TasksService,TaskRepository]
})
export class TasksModule {}
