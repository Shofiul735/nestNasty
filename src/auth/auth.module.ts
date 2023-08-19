import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstant } from './constants/jwt.constant';
import { PassportConstant } from './constants/passport.constant';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';


@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JwtConstant.secret,
      signOptions:{
        expiresIn: JwtConstant.expireTime,
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,UserRepository,{
    provide: APP_GUARD, // Make the Authentication globally available using AuthGaurd from src/auth/auth.guard.ts
    useClass: AuthGuard
  }],
  exports: []
})
export class AuthModule {}
