import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dtos/user-credentials.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){

    }

    @Public()
    @Post('/signup')
    singUp(@Body() userCredentialsDto:UserCredentialsDto):Promise<boolean>{
        return this.authService.createUser(userCredentialsDto);
    }

    @Public()
    @Post('/signin')
    signin(@Body() userCredentialsDto:UserCredentialsDto): Promise<Object>{
        return this.authService.signinUser(userCredentialsDto);
    }

    @Get()
    doSomething(){
        return 'Doing something!';
    }
}
