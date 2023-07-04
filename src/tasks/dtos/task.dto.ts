import { IsEmpty, IsNotEmpty } from "class-validator";


export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
    
    @IsEmpty()
    createdBy: string;
}