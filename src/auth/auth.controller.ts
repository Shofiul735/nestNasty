import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dtos/user-credentials.dto';

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
}
