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
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: PassportConstant.strategy,
    }),
    JwtModule.register({
      secret: JwtConstant.secret,
      signOptions:{
        expiresIn: JwtConstant.expireTime,
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,UserRepository,JwtStrategy],
  exports: [
    PassportModule,
    JwtStrategy
  ]
})
export class AuthModule {}
