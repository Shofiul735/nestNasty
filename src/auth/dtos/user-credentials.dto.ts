import { IsNotEmpty, IsString, Matches, matches } from "class-validator";

export class UserCredentialsDto{
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
        message:'Password must contain one upper,lower,and special character'
    })
    password:string;
}