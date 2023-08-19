import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dtos/user-credentials.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){

    }

    @Post('/signup')
    singUp(@Body() userCredentialsDto:UserCredentialsDto):Promise<boolean>{
        return this.authService.createUser(userCredentialsDto);
    }

    @Post('/signin')
    signin(@Body() userCredentialsDto:UserCredentialsDto): Promise<Object>{
        return this.authService.signinUser(userCredentialsDto);
    }

    @Get()
    @UseGuards(AuthGuard)
    doSomething(){
        return 'Doing something!';
    }
}
