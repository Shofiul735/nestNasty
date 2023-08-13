import { Injectable, Scope, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./repository/users.repository";
import { PassportStrategy } from "@nestjs/passport";
import { JwtConstant } from "./constants/jwt.constant";
import { JwtPayload } from "./dtos/jwt.payload.interface";
import { User } from "./entities/user.entity";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(private readonly userRepository: UserRepository){
        super({
            secretOrKey: JwtConstant.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        })
    }

    async validate(payload: JwtPayload): Promise<User>{
        const {userName} = payload;

        const user:User = await this.userRepository.findOneBy({userName});

        if(!user){
            throw new UnauthorizedException()
        }
        return user;

    }
}
