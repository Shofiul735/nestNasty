import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Task } from './tasks/dbModels/task.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-managment',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
